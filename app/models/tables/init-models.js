var DataTypes = require("sequelize").DataTypes;
var _access_log = require("./access_log");
var _conversation = require("./conversation");
var _media = require("./media");
var _message = require("./message");
var _recover_password = require("./recover_password");
var _user = require("./user");
var _user_role = require("./user_role");
var _user_status = require("./user_status");

function initModels(sequelize) {
  var access_log = _access_log(sequelize, DataTypes);
  var conversation = _conversation(sequelize, DataTypes);
  var media = _media(sequelize, DataTypes);
  var message = _message(sequelize, DataTypes);
  var recover_password = _recover_password(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_role = _user_role(sequelize, DataTypes);
  var user_status = _user_status(sequelize, DataTypes);

  user.belongsToMany(user, { as: 'user_id_two_users', through: conversation, foreignKey: "user_id_one", otherKey: "user_id_two" });
  user.belongsToMany(user, { as: 'user_id_one_users', through: conversation, foreignKey: "user_id_two", otherKey: "user_id_one" });
  message.belongsTo(conversation, { as: "conversation_user_id_one_conversation", foreignKey: "conversation_user_id_one"});
  conversation.hasMany(message, { as: "messages", foreignKey: "conversation_user_id_one"});
  message.belongsTo(conversation, { as: "conversation_user_id_two_conversation", foreignKey: "conversation_user_id_two"});
  conversation.hasMany(message, { as: "conversation_user_id_two_messages", foreignKey: "conversation_user_id_two"});
  access_log.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(access_log, { as: "access_logs", foreignKey: "user_id"});
  conversation.belongsTo(user, { as: "user_id_one_user", foreignKey: "user_id_one"});
  user.hasMany(conversation, { as: "conversations", foreignKey: "user_id_one"});
  conversation.belongsTo(user, { as: "user_id_two_user", foreignKey: "user_id_two"});
  user.hasMany(conversation, { as: "user_id_two_conversations", foreignKey: "user_id_two"});
  media.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(media, { as: "media", foreignKey: "user_id"});
  message.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(message, { as: "messages", foreignKey: "user_id"});
  recover_password.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(recover_password, { as: "recover_passwords", foreignKey: "user_id"});
  user.belongsTo(user_role, { as: "user_role", foreignKey: "user_role_id"});
  user_role.hasMany(user, { as: "users", foreignKey: "user_role_id"});
  user.belongsTo(user_status, { as: "user_status", foreignKey: "user_status_id"});
  user_status.hasMany(user, { as: "users", foreignKey: "user_status_id"});

  user.addHook("beforeCreate", async (user, options) => {
		const hashedPassword = await argon2.hash(user.password, {
			type: argon2.argon2id,
			memoryCost: 15360,
			timeCost: 2,
			parallelism: 1,
		});
		user.password = hashedPassword;
	});

	//Setting default values for User's user_role_id and user_status_id with some testing values (to be updated later on)
	user.addHook("beforeCreate", async (user, options) => {
		user.user_role_id = 3;
		user.user_status_id = 2;
	});
  
  return {
    access_log,
    conversation,
    media,
    message,
    recover_password,
    user,
    user_role,
    user_status,
  };

}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

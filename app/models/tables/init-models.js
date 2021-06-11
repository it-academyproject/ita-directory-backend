var DataTypes = require("sequelize").DataTypes;
var _access_log = require("./access_log");
var _recover_password = require("./recover_password");
var _user = require("./user");
var _user_role = require("./user_role");
var _user_status = require("./user_status");
const argon2 = require('argon2');

function initModels(sequelize) {
  var access_log = _access_log(sequelize, DataTypes);
  var recover_password = _recover_password(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_role = _user_role(sequelize, DataTypes);
  var user_status = _user_status(sequelize, DataTypes);

  access_log.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(access_log, { as: "access_logs", foreignKey: "user_id"});
  recover_password.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(recover_password, { as: "recover_passwords", foreignKey: "user_id"});
  user.belongsTo(user_role, { as: "user_role", foreignKey: "user_role_id"});
  user_role.hasMany(user, { as: "users", foreignKey: "user_role_id"});
  user.belongsTo(user_status, { as: "user_status", foreignKey: "user_status_id"});
  user_status.hasMany(user, { as: "users", foreignKey: "user_status_id"});

  user.addHook('beforeCreate', async(user, options)=> {
    const hashedPassword = await argon2.hash(user.password,
      { type: argon2.argon2id,
        memoryCost: 15360,
        timeCost: 2,
        parallelism: 1
      })        
    user.password = hashedPassword; 
  })
    
  return {
    access_log,
    recover_password,
    user,
    user_role,
    user_status,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

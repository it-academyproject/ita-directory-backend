const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"access_log",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
				primaryKey: true,
			},
			login: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			logout: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			user_id: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
				references: {
					model: "user",
					key: "id",
				},
			},
		},
		{
			sequelize,
			tableName: "access_log",
			timestamps: false,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{name: "id"}],
				},
				{
					name: "fk_access_log_user1_idx",
					using: "BTREE",
					fields: [{name: "user_id"}],
				},
			],
		}
	);
};

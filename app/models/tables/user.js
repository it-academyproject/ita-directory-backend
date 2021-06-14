const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"user",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(45),
				allowNull: true,
			},
			lastnames: {
				type: DataTypes.STRING(45),
				allowNull: true,
			},
			email: {
				type: DataTypes.STRING(45),
				allowNull: true,
			},
			password: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			user_status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 2,
				references: {
					model: "user_status",
					key: "id",
				},
			},
			user_role_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 3,
				references: {
					model: "user_role",
					key: "id",
				},
			},
		},
		{
			sequelize,
			tableName: "user",
			timestamps: false,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{name: "id"}],
				},
				{
					name: "fk_user_user_status_idx",
					using: "BTREE",
					fields: [{name: "user_status_id"}],
				},
				{
					name: "fk_user_user_role1_idx",
					using: "BTREE",
					fields: [{name: "user_role_id"}],
				},
			],
		}
	);
};

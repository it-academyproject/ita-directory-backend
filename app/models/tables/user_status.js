/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const user_status = sequelize.define(
		"user_status",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			active: {
				type: DataTypes.INTEGER(4),
				allowNull: false,
				defaultValue: 0,
			},
			pending: {
				type: DataTypes.INTEGER(4),
				allowNull: false,
				defaultValue: 0,
			},
			rejected: {
				type: DataTypes.INTEGER(4),
				allowNull: false,
				defaultValue: 0,
			},
			deleted: {
				type: DataTypes.INTEGER(4),
				allowNull: false,
				defaultValue: 0,
			},
		},
		{
			sequelize,
			tableName: "user_status",
		}
	);

	user_status.associate = (models) => {
		user_status.hasMany(models.user, {
			foreignKey: "user_status_id",
		});
	};

	return user_status;
};

/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const media = sequelize.define(
		"media",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
			},
			size: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			path: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			mime_type: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "media",
		}
	);
	media.associate = (models) => {
		media.hasMany(models.user, {
			foreignKey: "media_id",
		});
	};
	return media;
};

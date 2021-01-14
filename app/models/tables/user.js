/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const user = sequelize.define(
		"user",
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
			},
			user_role_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				references: {
					model: {
						tableName: "user_role",
					},
					key: "id",
				},
			},
			user_status_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				references: {
					model: {
						tableName: "user_status",
					},
					key: "id",
				},
			},
			media_id: {
				type: DataTypes.BIGINT,
				allowNull: true,
				references: {
					model: {
						tableName: "media",
					},
					key: "id",
				},
			},
			email: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			password: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "user",
		}
	);

	user.prototype.validatePassword = (password, hashedPassword) => {
		try {
			return bcrypt.compare(password, hashedPassword);
		} catch (error) {
			throw new Error(error);
		}
	};

	user.prototype.generateHash = (password) => {
		try {
			return bcrypt.hashSync(
				password,
				bcrypt.genSaltSync(parseFloat(process.env.BCRYPT_SALT))
			);
		} catch (error) {
			throw new Error(error);
		}
	};

	user.beforeCreate(async (user, options) => {
		if (user.password) {
			const hashedPassword = await bcrypt.hash(
				user.password,
				bcrypt.genSaltSync(parseFloat(process.env.BCRYPT_SALT))
			);
			user.password = hashedPassword;
		}
	});

	user.associate = (models) => {
		user.belongsTo(models.user_role, {foreignKey: "user_role_id"});
		user.belongsTo(models.user_status, {foreignKey: "user_status_id"});
		user.belongsTo(models.media, {foreignKey: "media_id"});
	};

	return user;
};

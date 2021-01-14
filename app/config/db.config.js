module.exports = {
	USER:
		process.env.NODE_ENV === "development"
			? process.env.DB_USER_LOCAL
			: process.env.DB_USER_PROD,
	PASSWORD:
		process.env.NODE_ENV === "development"
			? process.env.DB_PASS_LOCAL
			: process.env.DB_PASS_PROD,
	DB:
		process.env.NODE_ENV === "development"
			? process.env.DB_NAME_LOCAL
			: process.env.DB_NAME_PROD,
	OPTIONS: {
		host:
			process.env.NODE_ENV === "development"
				? process.env.DB_HOST_LOCAL
				: process.env.DB_HOST_PROD,
		dialect: "mysql",
		define: {
			freezeTableName: true,
		},
	},
};

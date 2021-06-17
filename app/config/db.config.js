module.exports = {
	USER: process.env.DB_USER,
	PASSWORD: process.env.DB_PASS,
	DB: process.env.DB_NAME,
	OPTIONS: {
		host: process.env.DB_HOST,
		dialect: "mysql",
		define: {
			freezeTableName: true,
		},
	},
};

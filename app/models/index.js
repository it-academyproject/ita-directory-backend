const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const initModels = require("./tables/init-models");

// Database connection
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, dbConfig.OPTIONS);
const db = initModels(sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;
if (process.env.NODE_ENV === "development") {
	console.log(dbConfig);
}

module.exports = db;

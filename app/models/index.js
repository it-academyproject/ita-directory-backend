const dbConfig = require("../config/db.config.js");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const Sequelize = require("sequelize");

// Database connection
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, dbConfig.OPTIONS);
const db = {};

fs.readdirSync(__dirname + "/tables/")
	.filter((file) => {
		return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
	})
	.forEach((file) => {
		const model = require(path.join(__dirname + "/tables/", file))(sequelize, Sequelize);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
if (process.env.NODE_ENV === "development") {
	console.log(dbConfig);
}

module.exports = db;

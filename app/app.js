const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const JwtStrategy = require("./middleware/verifyToken");
const passport = require("passport");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./utils/swagger.json");

const db = require("./models");
const userRoutes = require("./routes/_reference");

// Check the connection with the DB
db.sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully.");
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

// Initiate the app
const app = express();

app.use(cors());

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json({limit: "50mb", type: "application/json"}));

// API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Simple, initial route
app.get("/", (req, res) => {
	res.json({message: "ITA DIRECTORY API"});
});

// Routes
app.use("/users", userRoutes);

module.exports = app;

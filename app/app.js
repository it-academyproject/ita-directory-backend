const express = require("express");
// const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const JwtStrategy = require("./middleware/verifyToken");
// const passport = require("passport");
const helmet = require("helmet");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./utils/swagger.json");
const expressJSDocSwagger = require('express-jsdoc-swagger');
const swaggerOptions= require("./utils/swaggerOptions")
const db = require("./models");
const userRoutes = require("./routes/users");

const authenticateToken = require("./middleware/verifyToken");
const UsersController = require("./controllers/users");

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
app.use(express.json());

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json({limit: "50mb", type: "application/json"}));

// API
expressJSDocSwagger(app)(options);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Simple, initial route
app.get("/", (req, res) => {
	res.json({message: "ITA DIRECTORY API"});
});

app.get("/getToken", UsersController.getToken);
app.get("/testToken", authenticateToken, (req, res) => {
	res.json({message: "Correct Token !"});
});

// Routes
app.use("/users", userRoutes);

module.exports = app;

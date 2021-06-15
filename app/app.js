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
const options= require("./utils/swaggerOptions")
const db = require("./models");
const userRoutes = require("./routes/users");
const constantsRoute = require("./routes/constants");
const path = require("path");

const authenticateToken = require("./middleware/verifyToken");
const UsersController = require("./controllers/users");
const constantsController = require("./controllers/constants");

let CONSTANTS = {};

// Check the connection with the DB
db.sequelize
	.authenticate()
	.then(
		async () => {
			console.log("Connection has been established successfully.");

			CONSTANTS = await constantsController.loadConstants();
		}
	)
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

// Initiate the app
const app = express();

app.use(cors());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);

//Setting ejs for testing uploadFile routes. To Be Deleted after approval.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json({limit: "50mb", type: "application/json"}));

// API
expressJSDocSwagger(app)(options);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Simple, initial route
app.get("/", (req, res) => {
	console.log(CONSTANTS);
	res.json({message: "ITA DIRECTORY API"});
});

app.get("/getToken", UsersController.getToken);
app.get("/testToken", authenticateToken, (req, res) => {
	res.json({message: "Correct Token !", data: {"user_id": req.userId} });
});

// Routes
app.use("/", constantsRoute);
app.use("/users", userRoutes);

module.exports = app;

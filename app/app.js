const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const expressJSDocSwagger = require("express-jsdoc-swagger");
const options = require("./utils/swaggerOptions");
const db = require("./models");
const userRoutes = require("./routes/users");
const constantsRoute = require("./routes/constants");

const authenticateToken = require("./middleware/verifyToken");
const UsersController = require("./controllers/users");
const {loadConstants} = require("./utils/CONSTANTS");

// Check the connection with the DB
db.sequelize
	.authenticate()
	.then(async () => {
		console.log("Connection has been established successfully.");
		loadConstants();
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

// Initiate the app
const app = express();

app.use(cors());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

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

// Routes
app.use("/", constantsRoute);
app.use("/users", userRoutes);

app.get("/get-token", UsersController.getToken);
app.get("/test-token", authenticateToken, (req, res) => {
	res.json({message: "Correct Token !", data: {user_id: req.userId}});
});

module.exports = app;

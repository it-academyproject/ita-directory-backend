const path = require("path");
require("dotenv").config({path: path.join(__dirname, ".env")});
const app = require("./app/app.js");

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}.`);
	console.log(`Visit: http://localhost:${process.env.PORT}/`);
});

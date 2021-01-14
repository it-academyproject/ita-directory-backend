const path = require("path");
require("dotenv").config({path: path.join(__dirname, ".env")});

// Start the server
if (process.env.NODE_ENV === "development") {
	PORT = process.env.PORT_LOCAL;
} else {
	PORT = process.env.PORT_PROD;
}

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
	console.log(`Visit: http://localhost:${PORT}/`);
});

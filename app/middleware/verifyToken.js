const jwt = require("jsonwebtoken");

module.exports = authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	if (typeof authHeader !== "undefined") {
		const token = authHeader && authHeader.split(" ")[1];
		if (token == null) return res.sendStatus(401);
		jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
			//console.log(err.message);
			if (err)
				return res.status(401).send({
					code: "error",
					message: "Token has expired!",
				});
			req.authData = authData;
			next();
		});
	} else res.sendStatus(403);
};

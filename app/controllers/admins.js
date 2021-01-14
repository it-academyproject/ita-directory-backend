const JWT = require("jsonwebtoken");
const db = require("../models");
const Op = db.Sequelize.Op;

signToken = (userid) => {
	return JWT.sign(
		{
			iss: "itacademy",
			sub: {
				uid: userid,
			},
			iat: new Date().getTime(),
			exp: new Date().setDate(new Date().getDate() + 1),
		},
		process.env.JWT_SECRET
	);
};

// Get user
exports.getUsers = async (req, res) => {
	// Check that the request isn't empty
	if (!req.user) {
		res.status(404).send("User not found.");
	}
	try {
		const userModel = await db.mec_user.findOne({
			raw: true,
			nest: true,
			attributes: {
				exclude: ["mec_pwd", "password_change"],
			},
			include: [
				{
					model: db.profile,
					attributes: ["id"],
				},
				{
					model: db.mecuser_people,
				},
				{model: db.people},
			],
			where: {id: req.user.uid},
		});

		if (userModel) {
			if (userModel.person.picture) {
				userModel.person.picture = Buffer.from(userModel.person.picture).toString("base64");
			}
			res.status(200).json(userModel);
		} else {
			res.status(404).json({
				message: "User not found.",
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: err.message || "Some error ocurred while retrieving your account.",
		});
	}
};

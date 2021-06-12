// External modules
const JWT = require("jsonwebtoken");
const argon2 = require('argon2');
const Hashids = require('hashids');

// Internal modules
const db = require("../models/index");
const User = db.initModels.user; 
const apiResponse = require("./../utils/utils").apiResponse;

const signToken = (userid, maxAge = "15m") => {
	const hashids = new Hashids(process.env.JWT_SECRET, 10);
	const hashedId = hashids.encode(userid);
	return JWT.sign(
		{
			iss: "itacademy",
			sub: {
				user_id: hashedId,
			}
		},
		process.env.JWT_SECRET,
		{ expiresIn: maxAge }
	);
};

const signRefreshToken = (userid, maxAge = "1d") => {
	const hashids = new Hashids(process.env.REFRESH_TOKEN_SECRET, 10);
	const hashedId = hashids.encode(userid);
	return JWT.sign(
		{
			iss: "itacademy",
			sub: {
				user_id: hashedId,
			}
		},
		process.env.JWT_REFRESH_TOKEN_SECRET,
		{ expiresIn: maxAge }
	);
}

// Refresh token
exports.getRefreshToken = (req, res) => {
	let { refreshToken } = req.body
    if (!refreshToken) return res.status(400).send({
		success: "false",
		message: "refresh token missing"
	});
	JWT.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) return res.sendStatus(401);
		  const accessToken = signToken(payload.sub.user_id);
		  refreshToken = signRefreshToken(payload.sub.user_id);
		  res.status(200).send({
			accessToken: accessToken,
			refreshToken: refreshToken 
		  })
		})
}

// Get token
exports.getToken = (req, res) => {
	const idUser = '100001';
	const accessToken = signToken(idUser);
	const refreshToken = signRefreshToken(idUser);
	res.status(200).send({
		code: "success",
		header: "Welcome",
		message: "Your token",
		accesstoken: accessToken,
		refreshToken: refreshToken
	});
}

// Get User (/v1/get_me endPoint)
exports.getUser = async (req, res) => {
	// Check that the request isn't empty
	if (!req.body) {
		res.status(400).send("Request is empty.");
	} 
	try {
		const user = await User.findOne({ where: { id: req.body.id } });
		if (user === null) {
		  res.status(204).json({
			success: "false",
			message: "user not found"
		});
		} else {
			res.status(200).json({
				success: "true",
				name: user.name,
				lastnames: user.lastnames
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: err.message || "Some error ocurred while retrieving your account.",
		});
	}
};

//Create user 
exports.createUser = async(req, res) => {
	try {
	const {name, lastnames, password} = req.body;
	const newUser = await User.create({ name: name, lastnames: lastnames, password: password, user_status_id: 1, user_role_id: 1});
	res.status(200).json({
		success: "true",
		user_id: newUser.id,
		name: newUser.name,
		lastnames: newUser.lastnames
	});
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: err.message || "Some error ocurred while retrieving your account.",
		});
	}
}  

//get all users (FOR TESTING PURPOSE)
exports.getAllUsers = async(req, res) => {
	try {
	const users = await User.findAll();	
	res.status(200).json(users);
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: err.message || "Some error ocurred while retrieving your account.",
		});
	}
}  

// Login
exports.login = async (req, res) => {
	const name = req.body.name;
	const email = req.body.username;
	const password = req.body.password;
	// Check that the request isn't empty
	if (!email || !password) {
		res.status(400).send({
			code: "error",
			message: "Content can not be empty!",
		});
		return;
	}

	try {
		const USER = await db.mec_user.findOne({
			attributes: ["id", "mec_pwd"],
			where: db.sequelize.where(
				db.sequelize.fn("lower", db.sequelize.col("mec_un")),
				db.sequelize.fn("lower", email)
			),
		});

		if (!USER) {
			res.status(200).send({
				code: "error",
				header: "User doesn't exist",
				message: "There's no user with that email, please try again or get in touch.",
			});
			return;
		}

		let value = await USER.validatePassword(password, USER.mec_pwd);

		if (!value) {
			res.status(200).send({
				code: "error",
				header: "Wrong password",
				message:
					"The password you introduced is incorrect, please try again or try to recover your password.",
			});
		} else {
			const token = signToken(USER.id);
			res.status(200).send({
				code: "success",
				header: "Welcome back",
				message: "We are redirecting you to your account.",
				token,
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).send({
			code: "error",
			message: err.message || "Some error ocurred while retrieving your account.",
		});
	}
};

//Update role to user with id_user & id_role (FOR TESTING PURPOSE)
exports.updateUserRole = async(req, res) => {
	if (!req.body) {
		res.status(400).send("Request is empty.");
	} 
	try {
		const user = await User.update({user_role_id: req.body.user_role_id},{ where: { id: req.body.user_id } });
		if (user === null) {
		  res.status(204).json({
			success: "false",
			message: "user not found"
		});
		} else {
			//make update & return data

			res.status(200).json({
				success: "true",
				name: user.name,
				lastnames: user.lastnames,
				user_role_id: user.user_role_id
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: err.message || "Some error ocurred while retrieving your account.",
		});
	}
};
  

/* // Get user
exports.getUser = async (req, res) => {
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
}; */

// Delete user
exports.deleteUser = async (req, res) => {
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

/* // Get user
exports.login = async (req, res) => {
	const email = req.body.username;
	const password = req.body.password;
	// Check that the request isn't empty
	if (!email || !password) {
		res.status(400).send({
			code: "error",
			message: "email and password compulsory!",
		});
		return;
	}

	try {
		const user = await User.findOne({ where: { email: email } });
		if (!user) return res.status(404).send({
				code: "error",
				header: "User doesn't exist",
				message: "There's no user with that email",
			})

	// TODO: password checking when password encryptation done with Argon2
		// let value = await USER.validatePassword(password, USER.mec_pwd);

		// if (!value) {
		// 	res.status(200).send({
		// 		code: "error",
		// 		header: "Wrong password",
		// 		message:
		// 			"The password you introduced is incorrect, please try again or try to recover your password.",
		// 	});
		// } else {
			const accessToken = signToken(user.id);
			const refreshToken = signRefreshToken(user.id);
			res.status(200).send({
				code: "success",
				header: "Welcome back",
				message: "We are redirecting you to your account.",
				"access-token": accessToken,
				"refresh-token": refreshToken
			});

	} catch (err) {
		console.log(err);
		res.status(500).send({
			code: "error",
			message: err.message || "Some error ocurred while retrieving your account.",
		});
	}
}; */

exports.forgetPassword = async (req, res) => {
	const {email} = req.body;
	try {
		const user = await db.mec_user.findOne({where: {mec_un: email}});
		if (user) {
			const token = JWT.sign(
				{
					iss: "itacademy",
					sub: {
						email,
					},
					iat: new Date().getTime(),
					exp: new Date().setDate(new Date().getMinutes() + 20), // Expires in 20 Minutes
				},
				process.env.JWT_SECRET
			);
			await db.password_recovery_log.create({
				id_mec_user: user.id,
				recovery_date: new Date(),
				recovery_active: true,
				token_id: token,
				password_old: user.password,
			});
			res.status(200).json({
				code: "success",
				header: "Forget Pass succesful url temp",
				message: "You have succesfuly forget Pass succesful url temp.",
				hash: encodeURI(new Buffer(token).toString("base64")), // cambiar
			});
		} else {
			res.status(404).send({
				code: "not-found",
				header: "user",
				message: "Email not found.",
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error ocurred.",
		});
	}
};

// - El usuario olvida su contraseña.
// - El usuario pincha en un enlace. Se le solicita el email.
// - Tu recibes el email, compruebas que el usuario existe.
// - Si existe generas un token y un expiry_date de una hora, así le das una hora para que responda a un email que le vas a enviar. (ese email no se lo envias por el momento).
// - El usuario entonces recibe un email, con un enlace a miweb.com/recover-password
// - Desde ahí se hace una petición GET con el hash que has generado, eso lo recibes como un query-parameter.
// - Compruebas si el hash pertenece al usuario y esta dentro del tiempo permitido. Si es así le das permiso para que cambie la contraseña.
// - Recibes la contraseña.
// - Actualizas la BD
exports.receiveEmailGetToken = async (req, res) => {
	try {
		const { user } = req.body
	
		const passUser = await User.findOne({
			where: {
				email: user
			}
		});
	
		// console.log(passUser);
		if (passUser) {
			const accessToken = signToken(passUser, "1h");
	
			res.status(200).json(
				apiResponse({
					message: "Access token granted.",
					data: accessToken
				})
			);
		} else {
			res.status(404).json(
				apiResponse({
					message: "User not found."
				})
			);
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(
			apiResponse({
				message: "An error occurred with your query.",
				errors: err.message
			})
		);
	}
}

exports.recoverPassword = async (req, res) => {
	try {
		const token = req.params.token;

		if (!token) {
			res.status(401).json(
				apiResponse({
					message: "Your token is empty."
				})
			);
		}

		JWT.verify(
			token, process.env.JWT_SECRET, 
			(err, authData) => {
				if (err) {
					res.status(401).json(
						apiResponse({
							message: "Your token has expired!",
							errors: err.message
						})
					);
				}

				res.status(200).json(
					apiResponse({
						message: "Authorization granted to change your password."
					})
				)
			}
		);

	} catch (err) {
		console.log(err);
		res.status(500).json(
			apiResponse({
				message: "An error ocurred.",
				errors: err.message
			})
		);
	}
};

exports.changePassword = async (req, res) => {
	try {
		const { password, user } = req.body;
		
		// Create hook for update password?
		const hashedPassword = await argon2.hash(
			password,
			{ 
				type: argon2.argon2id,
				memoryCost: 15360,
				timeCost: 2,
				parallelism: 1
			}
		);

		const passUser = await User.findOne({
			where: {
				email: user
			}
		});

		passUser.password = hashedPassword;
		passUser.save();

		res.status(200).json(
			apiResponse({
				message: "You password has been successfully changed."
			})
		);

	} catch (err) {
		res.status(500).json(
			apiResponse({
				message: "An error occurred.",
				errors: err.message
			})
		);
	}
}

exports.updateUserStatus = async (req, res) => {

	const User_status = db.initModels.user_status;
	const userStatusArray = await User_status.findAll({attributes: ['id', 'name'], raw: true});
	const userStatus = {};
	userStatusArray.forEach(item => userStatus[item.name] = item.id);
	
	const userStatusName = req.body.userStatus;
	const userStatusId = userStatus[userStatusName];
	const userId = req.body.id;
	
	if (userId == undefined) return res.status(400).json(apiResponse({ message: 'Missing user id in the request'}));
	try {
		const user = await User.findOne({ where: { id: userId } });
		if (user === null) {
		  res.status(404).json(apiResponse({ message: "User not found" }))
		} else {
			if (userStatusName == undefined || !userStatusId) {
				return res.status(400).json(apiResponse({ message: "User status not valid" }))
			}
			await User.update({user_status_id: userStatusId}, { where: { id : userId } });
			const updatedUser = await User.findOne({ where: { id: userId } });
			res.status(200).json(apiResponse({ message: "User updated", data: updatedUser }))
		}
	} catch (err) {
		console.error(err);
		res.status(500).json(apiResponse({
			message: "Some error ocurred while updating your account.",
			error: [err.message]
		}))
	}
}


// exports.updatePassword = async (req, res) => {
// 	const uemail = req.body.email;
// 	const upwd = req.body.password;
// 	// Validate request
// 	if (!uemail || !upwd) {
// 		res.status(400).send({
// 			code: "error",
// 			message: "You need to write your email and password.",
// 		});
// 		return;
// 	}

// 	try {
// 		const USER = await db.mec_user.findOne({where: {mec_un: uemail}});

// 		if (!USER) {
// 			res.status(200).send({
// 				code: "error",
// 				message: "There's no user with that email.",
// 			});
// 			return;
// 		}

// 		// Update password
// 		let new_pass = db.mec_user.prototype.generateHash(upwd);
// 		USER.mec_pwd = new_pass;
// 		await USER.save();

// 		res.status(200).send({
// 			code: "success",
// 			message: "Your password has been updated succesfuly.",
// 		});
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).send({
// 			code: "error",
// 			message: err.message || "Some error ocurred while retrieving your account.",
// 		});
// 	}
// };

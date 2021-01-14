const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const {ExtractJwt} = require("passport-jwt");
const db = require("./app/models");

passport.use(
	new JWTstrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
			secretOrKey: process.env.JWT_SECRET,
		},
		async (payload, done) => {
			try {
				const user = await db.user.findByPk(payload.sub.uid);

				// If user doesn't exist send null
				if (!user) {
					return done(null, false, {
						message: "The user doesn't exist",
					});
				}

				// Return User ID
				done(null, payload.sub.uid, {
					message: "User authenticated, proceed.",
				});
			} catch (error) {
				done(error, false, {message: "there was an error"});
				console.log(error);
			}
		}
	)
);

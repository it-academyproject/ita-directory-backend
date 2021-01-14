const passport = require("passport-jwt");

const opt = {
	jwtFromRequest: passport.ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
	ignoreExpiration: false,
};

const JwtStrategy = new passport.Strategy(opt, async (payload, done) => {
	try {
		return done(null, payload.sub);
	} catch (err) {
		console.log(err);
		return done(err, false);
	}
});

module.exports = JwtStrategy;

const router = require("express").Router();
const passport = require("passport");
const passportConf = require("./../../passport");
const UsersController = require("./../controllers/user");

router.post("/v1/login", UsersController.login);

router.post(
	"/v1/update-password",
	// passport.authenticate("jwt", { session: false }),
	UsersController.updatePassword
);

router.post(
	"/v1/register",
	// passport.authenticate("jwt", { session: false }),
	UsersController.updatePassword
);

router.post("/forget-password", UsersController.forgetPass);

router.put(
	"/recover-password",
	passport.authenticate("jwt", {session: false}),
	UsersController.recoveryPass
);

router.get("/v1/user", passport.authenticate("jwt", {session: false}), UsersController.getUser);
router.patch("/v1/user", passport.authenticate("jwt", {session: false}), UsersController.getUser);

module.exports = router;

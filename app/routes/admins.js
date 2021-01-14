const router = require("express").Router();
const passport = require("passport");
const passportConf = require("./../../passport");

const AdminsController = require("./../controllers/admins");

router.get(
	"/v1/get-users",
	// passport.authenticate("jwt", { session: false }),
	AdminsController.getUsers
);

module.exports = router;

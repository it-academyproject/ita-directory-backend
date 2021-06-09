const router = require("express").Router();
const UsersController = require("./../controllers/users");

router.get('/v1/get_me', UsersController.getUser);

//Create User (for testing purpose)
router.post('/', UsersController.createUser);

//Read All Users (for testing purpose)
router.get('/', UsersController.getAllUsers);

/* router.post("/v1/login", UsersController.login);

// router.post(
// 	"/v1/update-password",
// 	// passport.authenticate("jwt", { session: false }),
// 	UsersController.updatePassword
// );

// router.post("/v1/register", UsersController.updatePassword);

router.post("/forget-password", UsersController.forgetPassword);

router.put("/recover-password", UsersController.recoveryPassword);

router.get("/v1/user", UsersController.getUser);
router.patch("/v1/user", UsersController.getUser);
 */
module.exports = router;

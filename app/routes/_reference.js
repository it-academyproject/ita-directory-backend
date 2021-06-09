const router = require("express").Router();
const UsersController = require("./../controllers/_reference");

// router.post("/v1/login", UsersController.login);

// router.post(
// 	"/v1/update-password",
// 	// passport.authenticate("jwt", { session: false }),
// 	UsersController.updatePassword
// );

/**
 * POST /v1/register
 * @summary Allows user to register
 * @tags user
 * @param {string} name - person's firstname
 * @param {string}  lastname - person's lastname
 * @param {string}  email - person's email
 * @param {string}  password - person's chosen password
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.post("/v1/register", UsersController.updatePassword);

router.post("/forget-password", UsersController.forgetPassword);

router.put("/recover-password", UsersController.recoveryPassword);

// router.get("/v1/user", UsersController.getUser);
// router.patch("/v1/user", UsersController.getUser);

module.exports = router;

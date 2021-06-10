const router = require("express").Router();
const UsersController = require("./../controllers/users");

router.get('/v1/get_me', UsersController.getUser);


/**
 * Registration data
 * @typedef {object} userRegistrationData 
 * @property {string} email.required - Email of the user
 * @property {string} password.required - Pwd of the user
 */

/**
 * POST /v1/register
 * @summary Allows user to register
 * @tags User
 * @param {userRegistrationData} request.body.required - The payload looks like this:
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 * @example request - Payload example
 * { "email": "email@example.com", "password":"secret"}
 * @example response - 200 - Example success response
 * { "status":"200", "message": "User registered correctly"}
 * @example response - 400 - Example error response
 * { "errCode":"errCode", "message":"Failed to register the user"}
 */

//Create User (for testing purpose)
router.post('/', UsersController.createUser);

//Read All Users (for testing purpose)
router.get('/', UsersController.getAllUsers);

//Refresh-token
router.get('/v1/refresh-token', UsersController.getRefreshToken);


router.post("/v1/login", UsersController.login);

/*router.post(
	"/v1/update-password",
	// passport.authenticate("jwt", { session: false }),
	UsersController.updatePassword
);

// router.post("/v1/register", UsersController.updatePassword);

router.post("/forget-password", UsersController.forgetPassword);

router.put("/recover-password", UsersController.recoveryPassword);

router.get("/v1/user", UsersController.getUser);
router.patch("/v1/user", UsersController.getUser);
 */
module.exports = router;

const router = require("express").Router();
const UsersController = require("./../controllers/users");
const uploadFile = require("./../middleware/uploadFile");

router.get("/v1/get_me", UsersController.getUser);

/**
 * Registration data
 * @typedef {object} userRegistrationData
 * @property {string} email.required - Email of the user
 * @property {string} password.required - Pwd of the user
 * @property {boolean} privacy.required - Accept privacy from user
 */

/**
 * POST /users/v1/register
 * @summary Allows user to register
 * @tags User
 * @param {userRegistrationData} request.body.required - The payload looks like this:
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 * @example request - Payload example
 * { "email": "email@example.com", "password":"secret", "privacy":true}
 * @example response - 200 - Example success response
 * { "status":"200", "message": "User registered correctly"}
 * @example response - 400 - Example error response
 * { "errCode":"errCode", "message":"Failed to register the user"}
 */

//Register
router.post("/v1/register", UsersController.registerUser);

//Read All Users (for testing purpose)
router.get("/", UsersController.getAllUsers);

//Refresh-token
router.get("/v1/refresh-token", UsersController.getRefreshToken);

/**
 * Login data
 * @typedef {object} userLoginData
 * @property {string} email.required - Email of the user
 * @property {string} password.required - Pwd of the user
 * @property {boolean} privacy.required - Accept privacy from user
 */

/**
 * POST /users/v1/login
 * @summary Allows user to login
 * @tags User
 * @param {userLoginData} request.body.required - The payload looks like this:
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 * @example request - Payload example
 * { "email": "email@example.com", "password":"secret", "privacy":true}
 * @example response - 200 - Example success response
 * { "status":"200", "message": "successfully logged in"}
 * @example response - 400 - Example error response
 * { "errCode":"errCode", "message":"login failed"}
 */
router.post("/v1/login", UsersController.login);

/**
 * POST /users/v1/logout
 * @summary Log out user
 * @tags User
 * @param {userLoginData} request.body.required - The payload looks like this:
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 * @example request - Payload example
 * { "user_id": 2}
 * @example response - 200 - Example success response
 * { "status":"200", "message": "successfully logged out"}
 * @example response - 400 - Example error response
 * { "errCode":"errCode", "message":"logout failed"}
 */
router.post("/v1/logout", UsersController.logout);

/**
 * Update data
 * @typedef {object} userUpdateData
 * @property {string} name- name of the user
 * @property {string} lastnames- lastnames of the user
 * @property {string} email- Email of the user
 * @property {string} password - Pwd of the user
 * @property {integer} user_status_id- Status of the user
 * @property {integer} user_role_id- Role of the user
 */

/**
 * PATCH /users/v1/user
 * @summary Allows Update some field to User
 * @tags User
 * @param {userUpdateData} request.body.required - The payload looks like this:
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 * @example request - Payload example
 * { "email": "email@example.com", "password":"secret", "privacy":true}
 * @example response - 200 - Example success response
 * { "status":"200", "message": "User updated correctly"}
 * @example response - 400 - Example error response
 * { "errCode":"errCode", "message":"User not found"}
 */
//Update some field to User
router.patch("/v1/user", UsersController.updateUser);

// Delete user
router.delete("/v1/:userId", UsersController.deleteUser);



/**
 * PATCH /users/v1/update-role"
 * @summary Allows user update his role
 * @tags User
 * @param {userRecoverData} request.body.required - The payload looks like this:
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 * @example request - Payload example
 * { "user_id": 1, "new_role_id": 2}
 * @example response - 200 - Example success response
 * { "status":"200", "message": "User role successfully updated"}
 * @example response - 400 - Example error response
 * { "errCode":"errCode", "message":"role could not be modified"}
 */

router.patch("/v1/update-role/:id", UsersController.updateUserRole);

/**
 * GET /users/v1/change-password/:token"
 * @summary Allows user update his role
 * @tags User
 * @param {userRecoverData} request.params.required - The payload looks like this:
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 * @example request - Payload example
 * { "user_id": 1, "new_role_id": 2}
 * @example response - 200 - Example success response
 * { "status":"200", "message": "Password recover done."}
 * @example response - 400 - Example error response
 * { "errCode":"errCode", "message":"Password could not be recovered"}
 */

router.get("/v1/change-password/:token", UsersController.recoverPassword);

/**
 * GET /users/v1/forget-password/"
 * @summary Create a temporary toke to recover password
 * @tags User
 * @param {userRecoverData} request.body.required - The payload looks like this:
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 * @example request - Payload example
 * { "email": "example@gmail.com"}
 * @example response - 200 - Example success response
 * { "status":"200", "message": "Temporary token succesfully created."}
 * @example response - 400 - Example error response
 * { "errCode":"errCode", "message":"Temporary token could not be recovered"}
 */

 router.get("/v1/forgot_password/", UsersController.forgetPassword);
/**
 * RecoverPassword data
 * @typedef {object} userRecoverData
 * @property {string} email.required - Email of the user
 * @property {boolean} privacy.required - Accept privacy from user
 */

/**
 * POST /users/v1/recover-password
 * @summary Confirms user allowed to get new password
 * * @tags token
 * @param {userRecoverData} request.body.required - The payload looks like this:
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 * @example request - Payload example
 * { "token": "email@example.com", "privacy":true}
 * @example response - 200 - Example success response
 * { "status":"200", "message": "Authorization granted to change your password."}
 * @example response - 400 - Example error response
 * { "errCode":"errCode", "message":"Your token has expired"}
 */
 router.post("/v1/recover_password", UsersController.recoverPassword);


//router.post("/v1/change-password", UsersController.changePassword);

module.exports = router;

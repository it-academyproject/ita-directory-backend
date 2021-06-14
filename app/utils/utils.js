const JWT = require("jsonwebtoken");
const Hashids = require('hashids');
const client = require('../utils/initRedis');
const { promisify } = require("util");

const hashids = new Hashids(process.env.HASH_ID_SECRET, 10);


// const toFile = require("data-uri-to-file");
// const Blob = require("cross-blob");

// const generateBlob = (file) => {
// 	toFile(file).then((file) => {
// 		return new Blob([file.data], {type: file.mimeType});
// 	});
// };


/*
/ message - A user friendly message of what happened, string, defaults to ''
/ data - The main data, defaults to an object, it can be any type
/ errors - An array of errors generated in processing, defaults to []
**/
const apiResponse = ({ message = '', data = {}, errors = [] }) => { return { message, data, errors } }

// const signToken = (userid, maxAge = "15m") => {
const signToken = (userid, maxAge = "2m") => {
	const hashedId = hashids.encode(userid);
	const payload = {iss: "itacademy", sub: { user_id: hashedId	}};
	const secret = process.env.JWT_SECRET;
	const options = { expiresIn: maxAge };
	return JWT.sign(payload, secret, options);
}
	
// const signRefreshToken = async (userid, maxAge = "1d") => {
const signRefreshToken = async (userid, maxAge = "4m") => {
	const hashedId = hashids.encode(userid);
	const payload = {iss: "itacademy", sub: { user_id: hashedId	}};
	const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
	const options = { expiresIn: maxAge };
	const token = JWT.sign(payload, secret, options);
	const set = promisify(client.set).bind(client);
	// await set(hashedId, token, 'EX', maxAge);
	// await set(hashedId, token, 'EX', 24 * 60 * 60);
	await set(hashedId, token, 'EX', 4 * 60);
	return token
}
	

module.exports = {
	// generateBlob,
	apiResponse,
	signToken,
	signRefreshToken
};

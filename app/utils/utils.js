const Joi = require("joi");
const JWT = require("jsonwebtoken");
const Hashids = require("hashids");
const {getRedisClient} = require("../utils/initRedis");

const hashids = new Hashids(process.env.HASH_ID_SECRET, 10);

/*
/ message - A user friendly message of what happened, string, defaults to ''
/ data - The main data, defaults to an object, it can be any type
/ errors - An array of errors generated in processing, defaults to []
**/
const apiResponse = ({message = "", data = {}, errors = []}) => {
	return {message, data, errors};
};

const AdByIdParamSchema = Joi.number().integer().required();

const registerSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(2).required(),
	privacy: Joi.boolean().valid(true).required(),
	user_status: Joi.number().required(),
	user_role: Joi.number().required(),
});

const adsSchema = Joi.object({
	user_id: Joi.number().required(),
	title: Joi.string().required(),
	description: Joi.string().required(),
	city: Joi.string().required(),
	n_rooms: Joi.number().required(),
	price: Joi.number().required(),
	square_meters: Joi.number().required(),
	n_bathrooms: Joi.number().required(),
	map_lat: Joi.number().required(),
	map_lon: Joi.number().required(),
});

const signToken = (userid, maxAge = "15m") => {
	const hashedId = hashids.encode(userid);
	const payload = {iss: "itacademy", sub: {user_id: hashedId}};
	const secret = process.env.JWT_SECRET;
	const options = {expiresIn: maxAge};
	return JWT.sign(payload, secret, options);
};

// maxAge = "1d" => 86400 must be a number for Redis expiration time
const signRefreshToken = (userid, maxAge = 86400) => {
	const hashedId = hashids.encode(userid);
	const payload = {iss: "itacademy", sub: {user_id: hashedId}};
	const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
	const options = {expiresIn: maxAge};
	const token = JWT.sign(payload, secret, options);
	//getRedisClient().set(userid, token, "EX", maxAge);
	return token;
};

module.exports = {
	// generateBlob,
	apiResponse,
	registerSchema,
	adsSchema,
	AdByIdParamSchema,
	signToken,
	signRefreshToken,
};

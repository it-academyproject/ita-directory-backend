const Joi = require("joi");
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
const apiResponse = ({message = "", data = {}, errors = []}) => {
	return {message, data, errors};
};

const registerSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(2).required(),
	privacy: Joi.boolean().valid(true).required(),
});

module.exports = {
	// generateBlob,
	apiResponse,
	registerSchema,
};

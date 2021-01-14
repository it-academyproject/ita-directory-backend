const toFile = require("data-uri-to-file");
const Blob = require("cross-blob");

const generateBlob = (file) => {
	toFile(file).then((file) => {
		return new Blob([file.data], {type: file.mimeType});
	});
};

module.exports = {
	generateBlob,
};

const multer = require("multer");

const allowMimeType = ["image/jpeg", "image/png"];

const extToMime = (type) => {
	return type.indexOf("/") === -1 ? type.split("/")[0] : type;
};

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, `${__dirname}/..${process.env.FOLDER_UPLOADS}`);
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + extToMime(file.originalname));
	},
});

const fileFilter = (req, file, cb) => {
	if (allowMimeType.indexOf(file.mimetype) !== -1) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

module.exports = multer({ storage: storage, fileFilter: fileFilter });

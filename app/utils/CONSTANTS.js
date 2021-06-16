// Internal modules
const db = require("../models/index");

let CONSTANTS = undefined;

async function loadConstants() {
	try {
		const user_role = await db.user_role.findAll({
			attributes: ["id", "name"],
			raw: true,
		});

		const user_status = await db.user_status.findAll({
			attributes: ["id", "name"],
			raw: true,
		});

		CONSTANTS = {user_role, user_status};
	} catch (err) {
		console.log(err);
	}
}

function setConstants() {
	loadConstants();
}

function getConstants() {
	return CONSTANTS;
}

module.exports = {
	loadConstants,
	getConstants,
	setConstants,
	CONSTANTS,
};

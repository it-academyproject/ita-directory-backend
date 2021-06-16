const apiResponse = require("../utils/utils").apiResponse;
const {CONSTANTS, loadConstants} = require("./../utils/CONSTANTS");

async function getConstantsRoute(req, res) {
	if (CONSTANTS === undefined) {
		await loadConstants();
	}

	try {
		res.status(200).json(
			apiResponse({
				message: "Constants fetched correctly.",
				data: CONSTANTS,
			})
		);
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	getConstantsRoute,
};

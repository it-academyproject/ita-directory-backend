const prisma = require("../../prisma/indexPrisma");
const {apiResponse, adsSchema} = require("../utils/utils");

async function createAd(req, res) {
	try {
		const {...fields} = req.body;
		await adsSchema.validateAsync(fields);

		const ad = await prisma.ads.create({
			data: fields,
		});

		res.status(200).json(
			apiResponse({
				message: "Ad created successfully.",
				data: ad,
			})
		);
	} catch (err) {
		if (err.isJoi && err.name === "ValidationError") {
			res.status(400).json(
				apiResponse({
					message: "Some values are not defined.",
					errors: err.message,
				})
			);
		}

		console.log(err);
		res.status(500).json(
			apiResponse({
				message: "An error occurred.",
				errors: err.message,
			})
		);
	}
}

module.exports = {
	createAd,
};

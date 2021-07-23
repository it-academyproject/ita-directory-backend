/* eslint-disable no-useless-catch */
const fs = require("fs");

const emailGenerator = (link) => {
	return new Promise((resolve, reject) => {
		const path = "./app/components/";
		let emailElements = {};
		let email = "";

		// read all components to build Email and build an Object
		fs.readdir(path, (err, files) => {
			if (err) {
				throw err;
			}
			files.forEach((file) => {
				const buffer = fs.readFileSync(path + file);
				const fileContent = buffer.toString();
				let key = file.split(".");
				emailElements[key[0]] = fileContent;
			});
		});

		// read Email template and replace values through components
		const generatedEmail = fs.readFileSync(
			"./app/template/email_template.html",
			"utf8",
			(err, data) => {
				if (err) {
					throw err;
				}
				email = data;
				for (const key in emailElements) {
					email = email.replace("{" + key + "}", emailElements[key]);
				}
			}
		);
		//reject(false)
		if (generatedEmail) {
			console.log("Email was succesfully generated and returned");
      console.log(generatedEmail);
			resolve(generatedEmail);
		} else {
			reject(console.log("Email could not be generated"));
		}
	});
};

module.exports = emailGenerator;

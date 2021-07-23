const fs = require("fs");

const emailGenerator = async () => {
	const path = "./app/components/";
	const pathToEmail = "./app/template/";
	let emailElements = {};
	let buffer = "";
	let fileContent = "";
	let email = "";

	// read all components to build Email and build an Object
	fs.readdir(path, (err, files) => {
		if (err) {
			throw err;
		}
		// insert filenmae as key, and the file as value
		files.forEach((file) => {
			buffer = fs.readFileSync(path + file);
			fileContent = buffer.toString();
			let key = file.split(".");
			emailElements[key[0]] = fileContent;
		});
	});

	// read Email template and replace values through components
	fs.readFile(pathToEmail + "email_template.html", "utf8", (err, data) => {
		if (err) {
			throw err;
		} else {
			email = data;
			for (const key in emailElements) {
				email = email.replace("{{" + key + "}}", emailElements[key]);
			}
		}
        fs.writeFile(pathToEmail + "email.html", email, function (err) {
            if (err) return console.log(err);
            console.log("EmailCreated");
          });
	});

    const generatedEmail = fs.readFileSync(pathToEmail + "email.html",'utf8');
    console.log("XXXX", generatedEmail)
    return generatedEmail;
};

module.exports = emailGenerator;

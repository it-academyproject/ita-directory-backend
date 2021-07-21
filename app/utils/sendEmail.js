const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, payload, template) => {
	try {
		console.log("Credentials obtained, sending message...");
		// create transporter object
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const message = {
			from: process.env.FROM_EMAIL,
			to: email,
			subject: subject,
			html: template,
		};

		// Send email
		transporter.sendMail(message, (err, info) => {
			if (err) {
				console.log("Error occurred. " + err.message);
				return process.exit(1);
			}

			console.log("Message sent: %s", info.messageId);
			// Preview only available when sending through an Ethereal account
			console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
			return true;
		});
	} catch (error) {
		console.error("Failed to create a testing account. " + error);
		return process.exit(1);
		//return error;
	}
};

module.exports = sendEmail;

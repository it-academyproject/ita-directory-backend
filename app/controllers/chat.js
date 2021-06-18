const db = require("../models/index");
const {apiResponse} = require("../utils/utils");
const { Op } = require("sequelize");

//get all conversations 
exports.getAllConversations = async (req, res) => {
	try {
		const conversations = await db.conversation.findAll();
		res.status(200).json(
			apiResponse({
				data: {conversations},
			})
		);
	} catch (err) { 
		console.error(err);
		res.status(500).json(
			apiResponse({
				message: "Internal server error",
				error: [err.message],
			})
		);
	}
};

//get conversation by user id 
exports.getConversationById = async (req, res) => {
	if (!req.body) {
		res.status(400).json(
			apiResponse({
				message: "Request is empty",
			})
		);
	}
	try {
        const conversation = await db.conversation.findOne({where: 
            {[Op.or]: [
                {user_id_one: req.body.id},
                {user_id_two: req.body.id}
            ]}});
		if (conversation === null) {
			res.status(200).json(
				apiResponse({
					message: "There is no conversation registered for this user",
			})
			);
		} else {
			res.status(200).json(
				apiResponse({
					data: {conversation},
				})
			);
		}
	} catch (err) {
		console.error(err);
		res.status(500).json(
			apiResponse({
				message: "Internal server error",
				error: [err.message],
			})
		);
	}
};

//get all messages 
exports.getAllMessages = async (req, res) => {
	try {
		const messages = await db.message.findAll();
		res.status(200).json(
			apiResponse({
				data: {messages},
			})
		);
	} catch (err) {
		console.error(err);
		res.status(500).json(
			apiResponse({
				message: "Internal server error",
				error: [err.message],
			})
		);
	}
};

//get all messages by user id 
exports.getMessageById = async (req, res) => {
	if (!req.body) {
		res.status(400).json(
			apiResponse({
				message: "Request is empty",
			})
		);
	}
	try {
        const message = await db.message.findAll({where:{user_id: req.body.id}});
		if (message.length === 0) {
			res.status(200).json(			
				apiResponse({
					message: "There is no message registered for this user",
			})
			);
		} if (message.length > 0) {
			res.status(200).json(
				apiResponse({
					data: {message},
				})
			);
		}
	} catch (err) {
		console.error(err);
		res.status(500).json(
			apiResponse({
				message: "Internal server error",
				error: [err.message],
			})
		);
	}
};
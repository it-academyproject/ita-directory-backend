const db = require("../models/index");

//get all conversations (FOR TESTING PURPOSE)
exports.getAllConversations = async (req, res) => {
	try {
		const conversations = await db.conversation.findAll();
		res.status(200).json(conversations);
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: err.message || "Some error ocurred while retrieving conversations.",
		});
	}
};

//get conversation by user id (FOR TESTING PURPOSE)
exports.getConversationById = async (req, res) => {
	if (!req.body) {
		res.status(400).send("Request is empty.");
	}
	try {
        const conversation = await db.conversation.findOne({where: 
            {[Op.or]: [
                {user_id_one: req.body.id},
                {user_id_two: req.body.id}
            ]}});
		if (conversation === null) {
			res.status(204).json({
				success: "false",
				message: "conversation not found",
			});
		} else {
			res.status(200).json({conversation});
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: err.message || "Some error ocurred while retrieving conversation.",
		});
	}
};

//get all messages (FOR TESTING PURPOSE)
exports.getAllMessages = async (req, res) => {
	try {
		const messages = await db.message.findAll();
		res.status(200).json(messages);
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: err.message || "Some error ocurred while retrieving messages.",
		});
	}
};

//get messages by user id (FOR TESTING PURPOSE)
exports.getMessageById = async (req, res) => {
	if (!req.body) {
		res.status(400).send("Request is empty.");
	}
	try {
        const message = await db.message.findOne({where:{user_id: req.body.id}});
		if (conversation === null) {
			res.status(204).json({
				success: "false",
				message: "message not found",
			});
		} else {
			res.status(200).json({message});
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: err.message || "Some error ocurred while retrieving messages.",
		});
	}
};
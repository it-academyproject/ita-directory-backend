const chatController = require("../controllers/chat");
const router = require("express").Router();

router.get("/v1/conversations", chatController.getAllConversations);
router.get("/v1/conversation", chatController.getConversationById);
//router.post("/v1/conversation", chatController.postConversation);

//router.get("/v1/messages", chatController.getAllMessages);
//router.get("/v1/message", chatController.getMessageByID);
//router.post("/v1/message", chatController.postMessage);

//router.get("/v1/chatbyuserid", chatController.getChatByUserId);

module.exports = router;
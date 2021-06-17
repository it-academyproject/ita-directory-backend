const authenticateToken = require("../middleware/verifyToken");
const adsController = require("../controllers/ads");
const router = require("express").Router();

router.post("/v1/post-ad", adsController.createAd);

module.exports = router;

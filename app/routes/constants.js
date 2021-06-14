const path = require("path");

const constantsController = require("../controllers/constants");
const router = require("express").Router();

router.get("/v1/constants", constantsController.getConstants);

module.exports = router;

const express = require("express");
const router = express.Router();
const { GET_ALL_LOGS, ADD_LOGS } = require("../controller/logs");

router.get("/logs", GET_ALL_LOGS);
router.post("/logs", ADD_LOGS);

module.exports = router;

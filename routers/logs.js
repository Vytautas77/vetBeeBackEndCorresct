const express = require("express");
const router = express.Router();
const {
  GET_ALL_LOGS,
  ADD_LOGS,
  GET_LOGS_BY_PET_ID,
} = require("../controller/logs");

router.get("/logs", GET_ALL_LOGS);
router.get("/logs/:id", GET_LOGS_BY_PET_ID);
router.post("/logs", ADD_LOGS);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  GET_ALL_MEDICATIONS,
  ADD_MEDICATION,
} = require("../controller/medications");

router.get("/medications", GET_ALL_MEDICATIONS);
router.post("/medications", ADD_MEDICATION);

module.exports = router;

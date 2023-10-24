const express = require("express");
const router = express.Router();
const {
  GET_ALL_PRESCRIPTIONS,
  ADD_PRESCRIPTIONS,
} = require("../controller/prescriptions");

router.get("/prescriptions", GET_ALL_PRESCRIPTIONS);
router.post("/prescriptions", ADD_PRESCRIPTIONS);

module.exports = router;

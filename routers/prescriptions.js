const express = require("express");
const router = express.Router();
const {
  GET_ALL_PRESCRIPTIONS,
  ADD_PRESCRIPTIONS,
  GET_ALL_PRESCRIPTIONS_BY_PET_ID,
} = require("../controller/prescriptions");

router.get("/prescriptions", GET_ALL_PRESCRIPTIONS);
router.get("/prescriptions/:id", GET_ALL_PRESCRIPTIONS_BY_PET_ID);
router.post("/prescriptions", ADD_PRESCRIPTIONS);

module.exports = router;

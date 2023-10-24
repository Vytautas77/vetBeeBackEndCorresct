const express = require("express");
const router = express.Router();
const { GET_ALL_PETS, ADD_PET, DELETE_PET } = require("../controller/pets");

router.get("/pets", GET_ALL_PETS);
router.post("/pets", ADD_PET);
router.delete("/pets/:id", DELETE_PET);

module.exports = router;

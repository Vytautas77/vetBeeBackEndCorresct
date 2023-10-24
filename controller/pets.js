/* eslint-disable no-undef */
const { v4: uuidv4 } = require("uuid");
const db = require("../db");

const GET_ALL_PETS = async (req, res) => {
  try {
    const pets = await db.query(
      "SELECT * FROM public.pets WHERE isarchived = false"
    );

    return res.json({ pets: pets.rows });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
};
const ADD_PET = async (req, res) => {
  try {
    const pet = await db.query(
      `
        INSERT INTO public.pets(id, pets_photo, name, dob, client_email)
        VALUES ($1, $2, $3, $4, $5)
      `,
      [
        uuidv4(),
        req.body.pets_photo,
        req.body.name,
        req.body.dob,
        req.body.client_email,
      ]
    );

    return res.status(201).json({ response: "Pet was added", pet });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
};
const DELETE_PET = async (req, res) => {
  try {
    const petId = req.params.id;
    const petStringId = petId.toString();
    console.log(petStringId);
    const result = await db.query(
      `UPDATE public.pets 
        SET isarchived = true
        WHERE id = $1
        `,
      [petStringId]
    );

    if (!result.rowCount) {
      return res.status(404).json({ response: "Pet not found" });
    }

    return res.json({ status: "Pet was updated" });
  } catch (err) {
    console.error("ERROR: ", err);
    res
      .status(500)
      .json({ response: "Something went wrong", error: err.message });
  }
};

module.exports = {
  GET_ALL_PETS,
  ADD_PET,
  DELETE_PET,
};

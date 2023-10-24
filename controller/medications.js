/* eslint-disable no-undef */
const { v4: uuidv4 } = require("uuid");
const db = require("../db");

const GET_ALL_MEDICATIONS = async (req, res) => {
  try {
    const medications = await db.query("SELECT * FROM public.medications");

    return res.json({ medications: medications.rows });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
};

const ADD_MEDICATION = async (req, res) => {
  try {
    const medication = await db.query(
      `
        INSERT INTO public.medications(id, name, description)
        VALUES ($1, $2, $3)
      `,
      [uuidv4(), req.body.name, req.body.description]
    );

    return res
      .status(201)
      .json({ response: "Medication was added", medication });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
};

module.exports = {
  GET_ALL_MEDICATIONS,
  ADD_MEDICATION,
};

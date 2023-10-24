/* eslint-disable no-undef */
const { v4: uuidv4 } = require("uuid");
const db = require("../db");

const GET_ALL_PRESCRIPTIONS = async (req, res) => {
  try {
    const prescriptions = await db.query(`
    SELECT pets.id, pets.name, pets.pets_photo, pets.dob, pets.client_email, medications.name, medications.description, prescriptions.comment, prescriptions.created_at
    FROM pets INNER JOIN prescriptions
    ON pets.id = prescriptions.pet_id
    INNER JOIN medications
    ON prescriptions.medication_id = medications.id
`);
    return res.json({ prescriptions: prescriptions.rows });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
};

const GET_ALL_PRESCRIPTIONS_BY_PET_ID = async (req, res) => {
  try {
    const prescriptions = await db.query(`
    SELECT pets.id, pets.name, pets.pets_photo, pets.dob, pets.client_email, medications.med_name, medications.description, prescriptions.comment, prescriptions.created_at
FROM pets left JOIN prescriptions 
ON pets.id = prescriptions.pet_id
FULL JOIN medications
ON prescriptions.medication_id = medications.id
WHERE pets.id = '${req.params.id}'
`);
    if (prescriptions.rows.length === 0) {
      return res.status(404).json({ response: "Pet not found" });
    }
    return res.json({ prescriptions: prescriptions.rows });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
};

const ADD_PRESCRIPTIONS = async (req, res) => {
  try {
    const prescription = await db.query(
      `
        INSERT INTO public.prescriptions(id, pet_id, medication_id, comment)
        VALUES ($1, $2, $3, $4)
      `,
      [uuidv4(), req.body.pet_id, req.body.medication_id, req.body.comment]
    );

    return res
      .status(201)
      .json({ response: "Prescriptions was added", prescription });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
};

module.exports = {
  GET_ALL_PRESCRIPTIONS,
  GET_ALL_PRESCRIPTIONS_BY_PET_ID,
  ADD_PRESCRIPTIONS,
};

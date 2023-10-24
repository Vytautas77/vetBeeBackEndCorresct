/* eslint-disable no-undef */
const { v4: uuidv4 } = require("uuid");
const db = require("../db");

const GET_ALL_LOGS = async (req, res) => {
  try {
    const logs = await db.query(`
    SELECT pets.id, pets.name, pets.pets_photo, pets.dob, pets.client_email, logs.description, logs.status
    FROM pets
    FULL JOIN logs ON pets.id = logs.pet_id
`);

    return res.json({ logs: logs.rows });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
};

const GET_LOGS_BY_PET_ID = async (req, res) => {
  try {
    const logs = await db.query(`
    SELECT pets.id, pets.name, pets.pets_photo, pets.dob, pets.client_email, logs.description, logs.status
    FROM pets
    LEFT JOIN logs
    ON pets.id = logs.pet_id
    WHERE pets.id = '${req.params.id}'
`);
    if (logs.rows.length === 0) {
      return res.status(404).json({ response: "Pet not found" });
    }
    return res.json({ logs: logs.rows });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
};

const ADD_LOGS = async (req, res) => {
  try {
    const log = await db.query(
      `
        INSERT INTO public.logs(id, pet_id, description, status) 
        VALUES ($1, $2, $3, $4)
      `,
      [uuidv4(), req.body.pet_id, req.body.description, req.body.status]
    );

    return res.status(201).json({ response: "Log was added", log });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "something went wrong" });
  }
};

module.exports = {
  GET_ALL_LOGS,
  GET_LOGS_BY_PET_ID,
  ADD_LOGS,
};

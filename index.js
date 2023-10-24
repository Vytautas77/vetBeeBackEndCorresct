const express = require("express");
const cors = require("cors");
require("dotenv").config();
const petsRouter = require("./routers/pets");
const medicationsRouter = require("./routers/medications");
const logsRouter = require("./routers/logs");
const prescriptionsRouter = require("./routers/prescriptions");

const app = express();
app.use(express.json());
app.use(cors());

app.use(petsRouter);
app.use(medicationsRouter);
app.use(logsRouter);
app.use(prescriptionsRouter);
app.use((req, res) => {
  return res.status(404).json({ response: "Endpoint not exits" });
});

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-undef
  console.log(`App started on port ${process.env.PORT}`);
});

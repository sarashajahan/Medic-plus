const express = require("express");
const mongoose = require("mongoose");
const { timeout } = require("nodemon/lib/config");
const bodyParser = require("body-parser");
const cors = require("cors");
const env = require("dotenv").config();
const medicalStore = require("./routes/MedicalStore/medicalStore");
const otp = require("./routes/MedicalStore/otp");
const userRoute = require("./routes/MedicalStore/user");
const app = express();
app.use(bodyParser.json());
app.use(cors());

//app.use("/api/medicalStore", medicalStore);
app.use("/api/otp", otp);
app.use("/api/users", userRoute);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connected to database`);
  })
  .catch((er) => {
    console.error(er);
  });

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  opno: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
    },
  },
  dob: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    enum: ["male", "female", "other"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date_of_admission: {
    type: Date,
    default: () => new Date(), //automatically set to current date
  },
  bloodgroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Bombay"],
    required: true,
  },
  //   password: {
  //     type: String,
  //     required: true,
  //   },
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;

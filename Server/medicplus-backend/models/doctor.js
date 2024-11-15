const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const doctor = mongoose.model("Doctor", doctorSchema);
module.exports = doctor;

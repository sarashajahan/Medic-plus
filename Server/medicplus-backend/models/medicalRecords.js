const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
  opNo: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  doctorsReview: {
    type: String,
  },
  recommendedTests: {
    type: String,
  },
  testResultReview: {
    type: String,
  },
  medicinesPrescribed: {
    type: String,
  },
  nextReviewDate: {
    type: Date,
  },
});

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);

module.exports = MedicalRecord;

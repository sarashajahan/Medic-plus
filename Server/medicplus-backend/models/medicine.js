const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  med_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  manufacturing_date: {
    type: Date,
    required: true,
  },
  expiry_date: {
    type: Date,
    required: true,
  },
  available_in_stock: {
    type: Number,
    required: true,
  },
  reserved_pills: {
    type: Number,
    default: 0,
  },
  pills_per_strip: {
    type: Number,
    required: true,
  },
  price_per_strip: {
    type: Number,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
});

const medicine = mongoose.model("medicine", MedicineSchema);
module.exports = medicine;

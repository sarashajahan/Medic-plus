import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  opno: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  age:{
    type:Number,
  },
  sex: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
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
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  address:{
    type:String,
  }
  //   password: {
  //     type: String,
  //     required: true,
  //   },
});

const Patient = mongoose.model("patient", patientSchema);
export {Patient as patient}

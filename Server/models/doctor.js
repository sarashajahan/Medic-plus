import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
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
export{doctor as Doctor}

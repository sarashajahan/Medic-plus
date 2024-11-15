import mongoose from "mongoose";

const counterSchema = {
  id: {
    type: String,
  },
  seq: {
    type: Number,
  },
};

const countermodel = mongoose.model("counter",counterSchema)
export {countermodel as counter}


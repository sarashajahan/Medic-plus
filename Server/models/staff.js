import mongoose from "mongoose";
import passwordComplexity from "joi-password-complexity";
import Joi from "joi";

const staffSchema = new mongoose.Schema({
  sid: {
    type: String,
    unique: true
  },
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

const Staff = mongoose.model("Staff", staffSchema);

const passwordComplexityOptions = {
  min: 6,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

function validateStaff(staff) {
  const schema = {
    sid: Joi.string().required(),
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string()
      .min(6)
      .required()
      .custom(passwordComplexity(passwordComplexityOptions)),
  };
  return Joi.validate(staff, schema);
}

export { Staff as Staff};

export {validateStaff as validateStaff}

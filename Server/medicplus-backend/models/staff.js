const mongoose = require("mongoose");
const passwordComplexity = require("joi-password-complexity");

const staffSchema = new mongoose.Schema({
  // staff_id: {
  //   type: String,
  //   required: true,
  // },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "staff"],
    default: "staff",
  },
  contact: {
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
  // Check if the staff has all necessary fields
  const schema = {
    staff_id: Joi.string().required(),
    name: Joi.string().min(3).max(50).required(),
    role: Joi.string()
      .valid(...Object.values(staff.role))
      .optional(),
    contact: Joi.string()
      .regex(/^[0-9]{10}$/)
      .required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string()
      .alphanum()
      .min(6)
      .required()
      .custom(passwordComplexity(passwordComplexityOptions)),
  };
  return Joi.validate(staff, schema);
}
exports.staff = Staff;
exports.validate = validateStaff;

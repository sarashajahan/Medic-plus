const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var cors = require("cors");

const router = express.Router();

const Staff = require("../../models/staff");
const staff = Staff.staff;
const validate = Staff.validate;
// Enable CORS
router.use(cors());
router.post("/signup", cors(), async (req, res) => {
  const { name, role, contact, email, password } = req.body;
  console.log(name);
  try {
    const user = await staff.findOne({ email: email });
    if (user) {
      return res.json({ msg: "user already exists" });
    }
    // const validUserData = await validate(req.body);
    // if (validUserData.error) {
    //   return res.status(400).send(validUserData.error.details[0].message);
    // }
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new staff({
      name,
      role,
      contact,
      email,
      password: hashpassword,
    });

    await newUser.save();
    return res.json({ status: true, msg: "User registered" });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error creating account");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await staff.findOne({ email: email });
  if (!user) {
    return res.json({ msg: "no user" });
  }

  const validpassword = await bcrypt.compare(password, user.password);
  if (!validpassword) {
    return res.json({ msg: "password incorrect" });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
  return res.json({ status: true, msg: "login successfully" });
});

module.exports = router;

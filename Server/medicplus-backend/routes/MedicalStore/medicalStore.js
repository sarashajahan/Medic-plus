const express = require("express");
const router = express.Router();
const { staff, validate } = require("../../models/staff");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let staffExist = await staff.findOne({ email: req.body.email });
  if (staffExist) return res.status(400).send("Staff already exists");
  const newStaff = new staff(req.body);
  try {
    const token = jwt.sign({ _id: newStaff._id }, process.env.STAFF_SECRET);
    newStaff.password = undefined;
    newStff.token = token;
    await newStaff.save();
    res.send(newStaff);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating the Staff Account");
  }
});

module.exports = router;

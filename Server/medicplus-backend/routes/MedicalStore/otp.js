const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Staff = require("../../models/staff");
const generateOTP = require("./generateOtp");
require("dotenv").config();
const staff = Staff.staff;

var otp;

router.post("/sendOtp", async (req, res) => {
  console.log(req.body);
  let email = req.body.email;
  if (!email) {
    return res.status(400).json({ msg: "Please provide an email address." });
  }
  const checkMail = await staff.findOne({ email });
  if (!checkMail) {
    return res.status(400).json({ msg: "Email not registered" });
  } else {
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    otp = generateOTP();
    console.log("otp : ", otp);

    var mailOptions = {
      from: `"No Reply" <${process.env.EMAIL}>`, // sender address
      to: `${email}`, // list of receivers
      subject: "Password Reset Request", // Subject line
      text: `Your password reset code is : ${otp}. This link will expire in 30 minutes. If you did not request a password reset please ignore this.`,
    };
    // }
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.error(`Error sending password reset request: ${err}`);
        return res
          .status(500)
          .json({ msg: "Error sending email. Please try again later." });
      } else {
        console.log(`Message sent: ${info.messageId}`);
        res.json({ msg: "Password reset request sent successfully." });
      }
    });
  }
});

router.post("/verifyOtp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await staff.findOne({ email: email });
    if (!user) throw new Error("User Not Found");
    if (user.isVerified)
      return res.status(409).json({ msg: "Account already verified." });
    if (user.otp === otp) {
      user.isVerified = true;
      user.save((err) => {
        if (err) throw err;
        res.status(200).json({ msg: "Email Verification Successful!" });
      });
    } else {
      res.status(401).json({ msg: "Invalid OTP." });
    }
  } catch (e) {
    res.status(500).json({ msg: e.toString() });
  }
});

module.exports = router;

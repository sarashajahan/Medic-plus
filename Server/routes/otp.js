import nodemailer from "nodemailer";
import express from "express";
import mongoose from "mongoose";
import { Staff } from "../models/staff.js";
import { UserOTPVerification } from "../models/UserOTPVerification.js";
import { generateOTP } from "../models/generateOtp.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const router = express.Router();

dotenv.config();

// const { Staff } = Staff;

router.post("/sendOtp", async (req, res) => {
  console.log(req.body);
  let email = req.body.email;
  if (!email) {
    return res.json({ status: false, msg: "Please provide an email address." });
  }
  const checkMail = await Staff.findOne({ email });
  if (!checkMail) {
    return res.json({ status: false, msg: "Email not registered" });
  } else {
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    let otp = generateOTP();
    console.log("otp :", otp);

    const mailOptions = {
      from: `"No Reply" <${process.env.EMAIL}>`,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Hello there!</p><br>
             <p>We received a request to reset your password. Your <strong>password reset code</strong> is: <strong>${otp}</strong>.</p>
             <p>This code is <strong>valid for the next 10 minutes</strong>. If you didn't request this, please <strong>ignore this email</strong>.</p>
             <br><p>Best regards,<br/>The Support Team</p>`
    };


    transporter.sendMail(mailOptions, async function (err, info) {
      if (err) {
        console.error(`Error sending password reset request: ${err}`);
        return res.json({ status: false, msg: "Error sending email. Please try again later." });
      } else {
        console.log(`Message sent: ${info.messageId}`);
        const newOtp = new UserOTPVerification({
          otp,
          email
        });
        await newOtp.save();

        return res.json({
          status: true,
          msg: "An OTP has been sent to your email.",
        });
      }
    });
  }
});

router.post("/validate-otp", async (req, res) => {
  const { otp, email } = req.body;

  try {
    const validOtp = await UserOTPVerification.findOne({ otp: otp, email: email });

    if (!validOtp) {
      return res.json({ status: false, msg: "Invalid OTP." });
    }

    let currentTime = Date.now();
    if (currentTime > validOtp.expireAt) {
      await UserOTPVerification.deleteOne({ otp: validOtp.otp });
      return res.status(408).json({ status: false, msg: "OTP Expired." });
    }

    await UserOTPVerification.deleteMany({ email: email })
    return res.json({
      status: true,
      msg: "OTP successfully verified"
    });
  } catch (err) {
    console.error(err.message);
    res.json({ status: false, msg: "Server Error" });
  }
});

router.post("/resetPassword", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Staff.findOne({ email: email })

    if (!user) {
      return res.json({ status: false, msg: "User does not exist" })
    }

    const hashpassword = await bcrypt.hash(password, 10);

    user.password = hashpassword;
    await user.save();

    return res.json({ status: true, msg: 'Password has been updated' })
  } catch (e) {
    return res.json({ status: false, msg: "Something went wrong! Please try again later." })
  }
});

export {router as otp}

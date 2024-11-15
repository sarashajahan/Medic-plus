import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import { counter } from "../models/counter.js";

const router = express.Router();

import { Staff } from "../models/staff.js";
import { validateStaff } from "../models/staff.js";
// Enable CORS
router.use(cors());

router.post("/signup", cors(), async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ status: false, error: "Required fields missing" });
}
  try {
    const user = await Staff.findOne({ email: email });
    if (user) {
      return res.json({ status: false, error: "user already exists" });
    }

    let Counter = await counter.findOneAndUpdate(
      { id: "staffId" },
      { $inc: { seq: 1 } },
      { new: true }
    );

    let sid; // staff id
    if (!Counter) {
      const newCounter = new counter({ id: "staffId", seq: 1000 });
      await newCounter.save();
      sid = 1000;
    } else {
      sid = Counter.seq;
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new Staff({
      sid,
      name,
      email,
      password: hashpassword,
    });

    await newUser.save();
    return res.json({ status: true, msg: "User registered" });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, error: "Error creating account" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: false, error: "Required fields missing" });
}else{
  const user = await Staff.findOne({ email: email });
  if (!user) {
    return res.json({status:false , error: "no user found" });
  }else{
    const validpassword = await bcrypt.compare(password, user.password);
    if (!validpassword) {
      return res.json({status:false, error: "password incorrect" });
    }
    
  }
  const token = jwt.sign({ email: user.email }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
  return res.json({ status: true, msg: "login successfully" });
  
}
  
});

export { router as userRouter }

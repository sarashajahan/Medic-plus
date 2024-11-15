import mongoose from "mongoose";

const UserOTPVerificationSchema = new mongoose.Schema({
  otp: { 
    type: String, 
    required: true },
  expireAt: {
    type : Date,
    default: function(){ return Date.now() + 10*60*1000 } // Expires in 10 min
  },
  email: {
    type: String,
    required:true
  }
});

const UserOTPVerification = mongoose.model("UserOTPVerification",UserOTPVerificationSchema);
export {UserOTPVerification as UserOTPVerification}


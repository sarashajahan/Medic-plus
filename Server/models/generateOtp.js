
import otpGenerator from 'otp-generator'
const generateOTP = () => {
  const OTP = otpGenerator.generate(4, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return OTP;
};

export {generateOTP as generateOTP}

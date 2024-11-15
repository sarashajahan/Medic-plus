import { useState, useRef } from 'react'; // Import useState and useRef hooks
import './Otp.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Otp = () => {
  const [inputs, setInputs] = useState(['', '', '', '']); // State to store OTP inputs
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]; // Refs for input fields
  
  const navigate = useNavigate();
  const location=useLocation();
  const {state:{ email }} = location;


  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    if (index < inputRefs.length - 1 && value) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && !inputs[index]) {
      inputRefs[index - 1].current.focus();
    }
  };

  const resendOTP = async  (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/sendOtp', { email: email })
      .then(res=>{
        if(res.data.status){
          console.log(res.data);
          alert(res.data.msg);
          window.location.reload()
        }else{
          alert("This Email is not registered");
      }
    });
    } catch (err) {
      console.log(err.response.data.msg);
      alert(err.response.data.msg);
    }
  }
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    var OTP = inputs.join('');
    console.log("OTP: ", OTP);
    try {
      const response = await axios.post('http://localhost:3000/api/validate-otp', {email:email, otp: OTP });
      if (response.data.status) {
        alert("Verified Successfully");
        navigate("/newpass", { state: { email : email} });
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  }


  return (
    <form className="otp-Form">
      <span className="mainHeading">Enter OTP</span>
      <p className="otpSubheading">We have sent a verification code to your mobile number</p>
      <div className="inputContainer">
        {inputs.map((value, index) => (
          <input
            key={index}
            maxLength="1"
            type="text"
            className="otp-input"
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={inputRefs[index]}
          />
        ))}
      </div>
      <button className="verifyButton" type="submit" onClick={handleSubmit}>Verify</button>
      <button className="exitBtn" >×</button>
      <p className="resendNote">Didn't receive the code? <button className="resendBtn" onClick={resendOTP}>Resend Code</button></p>
    </form>
  );
}

export default Otp;
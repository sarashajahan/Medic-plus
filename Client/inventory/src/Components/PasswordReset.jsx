import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
function PasswordReset() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const sendOtp = async () => {
    
    try {
      const response = await axios.post('http://localhost:3000/api/sendOtp', { email });
      setMessage(response.data.msg);
      
    } catch (error) {
      setMessage('Error sending OTP. Please try again later.');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/verifyOtp', { email, otp });
      console.log(response)
      navigate('/filter')
			navigate(0);
      setMessage(response.data.msg);
    } catch (error) {
      setMessage('Invalid OTP. Please try again.');
    }
  };

  return (
    <div>
      <h2>Password Reset</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>
      <br />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp}>Verify OTP</button>
      <br />
      <p>{message}</p>
    </div>
  );
}

export default PasswordReset;

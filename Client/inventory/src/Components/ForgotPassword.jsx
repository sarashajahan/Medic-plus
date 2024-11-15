import React, { useState } from 'react';
import "../App.css"
import { useNavigate } from 'react-router-dom';
import '../App'
import axios from 'axios';
// import '../App'


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const  navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    

    try {
      await axios.post('http://localhost:3000/api/sendOtp', { email: email })
      .then(res=>{
        if(res.data.status){
          console.log(res.data);
          alert(res.data.msg);
          navigate(`/otp`,{state:{email:email}})
        }else{
          alert("This Email is not registered");
      }
    });
    } catch (err) {
      console.log(err.msg);
      setError(err.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="forgotpassword-form">
      <div className="forgotpassword-div">
        <div className="title">Forgot Password?</div>
        <div className="fields">
          <div className="email">
            <input type="email" className="email-input" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
          </div>
        </div>
         
          <button type="submit" className="f-submit-button" onClick={handleSubmit}>Send OTP</button>
         
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </form>
  );
};

export default ForgotPassword;

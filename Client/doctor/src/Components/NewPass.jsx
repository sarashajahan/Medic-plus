import React, { useState } from 'react';
import '../App.css';
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const NewPass = () => {
    const [newpass, setNewpass] = useState('');
    const [confpass, setConfPass] = useState('');
    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');

    const navigate = useNavigate();
    
    const location= useLocation();
    const {state:{ email }} = location;

    //Axios.defaults.withCredentials = true;

    const handleNewPassChange = (e) => {
        const newPassword = e.target.value;
        if(newPassword==""){

        }else{
            setNewpass(newPassword);
        }
        
        const hasCapital = /[A-Z]/.test(newPassword);
        const hasLowercase = /[a-z]/.test(newPassword);
        const hasDigit = /\d/.test(newPassword);
        const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);

        if (newPassword.length < 8) {
            setError1("Password is too short");
        } else if (!hasCapital) {
            setError1("Password must contain at least one capital letter");
        } else if (!hasLowercase) {
            setError1("Password must contain at least one lowercase letter");
        } else if (!hasDigit) {
            setError1("Password must contain at least one digit");
        } else if (!hasSymbol) {
            setError1("Password must contain at least one symbol");
        } else {
            setError1('');
        }
    };

    const handleConfPassChange = (e) => {
        const confirmPassword = e.target.value;
        setConfPass(confirmPassword);
        if (confirmPassword !== newpass) {
            setError2("Passwords don't match");
        } else {
            setError2('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3000/doctor/resetPassword', {
            email: email,
            password: newpass
        }).then(response => {
            console.log(response);
            alert(response.data.message || 'Password reset successful');
            navigate('/home');
        }).catch(err => {
            console.log(err);
            alert(err.response.data.msg || 'An error occurred while resetting the password');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='login-div'>
                {/* <div className="logo"></div> */}
                <div className="title">Medic+</div>

                <div className="fields">
                    <div className="username" style={{width:"100%",borderRadius:"20px"}}>
                        <input className='newpass' type="password" autoComplete='off' placeholder='New Password' required value={newpass} onChange={handleNewPassChange} />
                        {error1 && <div className="error1">{error1}</div>}
                    </div>

                    <div className="password">
                        <input className='confpass' type="password" placeholder='Confirm Password' required value={confpass} onChange={handleConfPassChange} />
                        {error2 && <div className="error2">{error2}</div>}
                    </div>
                </div>

                <button type='submit' className='signin-button' disabled={error1 || error2}>Change Password</button>
            </div>
        </form>
    );
};

export default NewPass;

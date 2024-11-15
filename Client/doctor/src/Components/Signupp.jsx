import React, { useState } from 'react'
import '../App.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'



const Signupp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()



    const addCheckIconOnce = (errorElement) => {
        if (errorElement.querySelector('i') === null) {
          const icon = document.createElement('i');
          icon.setAttribute('class', 'fa-solid fa-circle-check');
          icon.setAttribute('style', 'color: green;');
          errorElement.appendChild(icon);
        }
      };

    const checkFirst = (input) => {
        // const x = input.value;
        let isValid = true;
        const errorElement = document.getElementById('firstname-error');
        if (input.length < 3 || input === '') {
          errorElement.innerHTML = 'Require minimum 3 characters';
          errorElement.style.color = 'red';
          isValid = false;
        } else {
          errorElement.innerHTML = '';
          errorElement.style.color = 'green';
          isValid = true;
          addCheckIconOnce(errorElement);
        }
        // console.log(input.length);
      };

      const checkEmail = (input) => {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const emailError = document.getElementById('email-error');
    
        if (input.match(mailformat)) {
          emailError.innerHTML = '';
          emailError.style.color = 'green';
        //   isValid = true;
          addCheckIconOnce(emailError);
        } else if (input === '') {
          emailError.innerHTML = 'Invalid Email format';
          emailError.style.color = 'red';
        } else {
          emailError.innerHTML = 'Invalid Email format';
          emailError.style.color = 'red';
        //   isValid = false;
        }
        // console.log(input);
      };
    
      const checkPass = (input) => {
        
        const passwordError = document.getElementById('password-error');
        if (input.length < 8 || input === '') {
          passwordError.innerHTML = 'Password must be at least 8 characters';
          passwordError.style.color = 'red';
        } else {
          passwordError.innerHTML = '';
          passwordError.style.color = 'green';
          addCheckIconOnce(passwordError);
        }
      };

      const confirmPass = (input) => {
        const newPassword = document.getElementById('newpass-input').value;
        const value = input;
        const confirmError = document.getElementById('confirm-error');
    
        if (value !== newPassword) {
          confirmError.innerHTML = 'Passwords do not match';
          confirmError.style.color = 'red';
        //   isValid = false;
        } else if (value === '') {
          confirmError.innerHTML = 'Enter the password';
          confirmError.style.color = 'red';
        } else {
          confirmError.innerHTML = '';
          confirmError.style.color = 'green';
        //   isValid = true;
          addCheckIconOnce(confirmError);
        }
        // console.log(newPassword)
      };

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:3000/auth/signup', { username, email, password 
    }).then(response => {
        navigate('/log')
        navigate(0);
    }).catch(err => {
        console.log(err)
    })
    }

    return (
        <div className='signin-div'>
            <div className="title">Hey, Welcome! &#x1F970;</div>
            <div className="fields">
                <form className="" onSubmit= {handleSubmit}>
                
                    <div className='username'><input className='in' type="text" placeholder='Username' onInput={(e) => checkFirst(e.target.value)} onChange={(e) => setUsername(e.target.value)}  />
                    </div>
                    <p id="firstname-error" className="error-message"> </p>
                    
                    <div className='username'><input className='in' type="email" autoComplete='off' placeholder='Email' onInput={(e) => checkEmail(e.target.value)} onChange={(e) => setEmail(e.target.value)} /></div>
                    <p id="email-error" className="error-message"></p>
                    
                    <div className='username'><input className='in' type="password" placeholder='Password' id='newpass-input' onInput={(e) => checkPass(e.target.value)} onChange={(e) => setPassword(e.target.value)} />
                    <i id="password-toggle" className="fa-regular fa-eye-slash" ></i></div>
                    <p id="password-error" className="error-message"></p>

                    <div className='username'><input className='in' type="password" placeholder='Confirm Password' onInput={(e) => confirmPass(e.target.value)}  /></div>
                    <p id="confirm-error" className="error-message"></p>
                    <button type='submit' className="signin-button">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signupp

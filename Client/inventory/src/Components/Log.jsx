import React, { useState } from 'react'
import '../App.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const Log = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [successalert, setAlert1] = useState(null);
    const [erroralert, setAlert2] = useState(null);

    // const togglePasswordVisibility = () => {
    //     setPasswordVisible(!passwordVisible);
    //   };

    const navigate = useNavigate()

    //Axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:3000/auth/login', {
            email, password
        }) .then(response => {
            console.log(response)
            console.log(response.data.msg)
            if (response.data.status) {
                setAlert1(response.data.msg);
                setTimeout(() => {
                    setAlert1('');
                    navigate('/homein');
                    window.location.reload();

                }, 3000);
            } else {
                setAlert2(response.data.error);
                setTimeout(() => {
                    setAlert2('');
                }, 3000);
            }
        }).catch(error => {
            console.error('Error:', error);
            setAlert2(error.response.data.error);
            setTimeout(() => {
                setAlert2('');
            }, 3000);
        });
    }

    return (
        <form  onSubmit={handleSubmit}>
            <div className='login-div' style={{height:"fit-content"}}>
                <div className="logo" style={{margin:"auto"}}></div>
                <div className="title">Medic+</div>


                <div className="fields" style={{width:"100%"}}>

                    <div className="username" style={{width:"100%",borderRadius:"20px"}}>
                        <div>
                            <svg fill="#999" viewBox="0 0 1024 1024" style={{marginTop:"0px"}}>
                                <path className="path1" d="M896 307.2h-819.2c-42.347 0-76.8 34.453-76.8 76.8v460.8c0 42.349 34.453 76.8 76.8 76.8h819.2c42.349 0 76.8-34.451 76.8-76.8v-460.8c0-42.347-34.451-76.8-76.8-76.8zM896 358.4c1.514 0 2.99 0.158 4.434 0.411l-385.632 257.090c-14.862 9.907-41.938 9.907-56.802 0l-385.634-257.090c1.443-0.253 2.92-0.411 4.434-0.411h819.2zM896 870.4h-819.2c-14.115 0-25.6-11.485-25.6-25.6v-438.566l378.4 252.267c15.925 10.618 36.363 15.925 56.8 15.925s40.877-5.307 56.802-15.925l378.398-252.267v438.566c0 14.115-11.485 25.6-25.6 25.6z"></path>
                            </svg>
                            <input className='in' type="email" autoComplete='off' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>



                    <div className="password">
                        <svg fill="#999" viewBox="0 0 1024 1024">
                            <path className="path1" d="M742.4 409.6h-25.6v-76.8c0-127.043-103.357-230.4-230.4-230.4s-230.4 103.357-230.4 230.4v76.8h-25.6c-42.347 0-76.8 34.453-76.8 76.8v409.6c0 42.347 34.453 76.8 76.8 76.8h512c42.347 0 76.8-34.453 76.8-76.8v-409.6c0-42.347-34.453-76.8-76.8-76.8zM307.2 332.8c0-98.811 80.389-179.2 179.2-179.2s179.2 80.389 179.2 179.2v76.8h-358.4v-76.8zM768 896c0 14.115-11.485 25.6-25.6 25.6h-512c-14.115 0-25.6-11.485-25.6-25.6v-409.6c0-14.115 11.485-25.6 25.6-25.6h512c14.115 0 25.6 11.485 25.6 25.6v409.6z"></path>
                        </svg>
                        <input className='in' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} /></div>
                </div>
                {successalert && (
                        <Alert variant="filled" severity="success">
                            {successalert}
                        </Alert>
                    )}
                    {erroralert && (
                        <Alert variant="filled" severity="error">
                            {erroralert}
                        </Alert>
                    )}
                <button type='submit' className='signin-button'>Login</button>

                <div className="link">
                    <Link to='/forgotpass'>Forgot password?</Link>
                    <p></p>or <Link to='/signupp'><p></p>Sign up</Link>
                </div>
            </div>
        </form>
    )
}

export default Log

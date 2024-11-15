import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Select from 'react-select';
import './doc.css';

export default function AddPatient() {

  const [name, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [address, setAddress] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successalert, setAlert1] = useState(null);
    const [erroralert, setAlert2] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: name,
        email: email,
        phone: phone,
        dob: dateOfBirth,
        sex: sex,
        blood: bloodGroup,
        address: address
      };
  
      const response = await axios.post('http://localhost:3000/patient/addPatient', formData);
      console.log(response.data.error)
      if (response.data.status) {
        setAlert1(response.data.msg);
        setTimeout(() => {
          setAlert1('');
          window.location.reload();
        }, 3000);
      } else {
        setAlert2(response.data.error);
      }
    } catch (error) {
      // Handle Axios error
      setAlert2(error.response.data.error || 'An error occurred while processing your request.');
      setTimeout(() => {
        setAlert2('');
      }, 3000);
    }
  };
  
  function validateFirstname(name) {
    if (name.length < 3) {
      return 'Name must be at least 3 letters';
    } else if (!/^[a-zA-Z\s]+$/.test(name)){
      return 'Name must contain only letters';
    } else {
      return '';
    }
  }

//   function validateLastname(lastname) {
//     if (lastname.length < 3) {
//       return 'Last name must be at least 3 letters';
//     } else if (!/^[a-zA-Z]+$/.test(lastname)) {
//       return 'Last name must contain only letters';
//     } else {
//       return '';
//     }
//   }

  function validatePhn(phone) {
    if (!/^\d+$/.test(phone)) {
      return 'Phone number must contain only digits';
    } else if (phone.length !== 10) {
      return 'Phone number must have exactly 10 digits';
    } else {
      return '';
    }
  }

  const validateEmail = (input) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    if (input.match(mailformat)) {
      setEmailError('');
    } else if (input === '') {
      setEmailError('Email is required');
    } else {
      setEmailError('Invalid Email format');
    }
  };

  function handleFirstNameChange(event) {
    const value = event.target.value;
    setFirstName(value);
    setFirstNameError(validateFirstname(value));
  }

//   function handleLastNameChange(event) {
//     const value = event.target.value;
//     setLastName(value);
//     setLastNameError(validateLastname(value));
//   }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePhoneChange(event) {
    const value = event.target.value;
    setPhone(value);
    setPhoneError(validatePhn(value));
  }

  function handleDateOfBirthChange(event) {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - selectedDate.getFullYear();
    setDateOfBirth(event.target.value);
  }

  function handleSexChange(event) {
    setSex(event.target.value);
  }

  function handleBloodGroupChange(event) {
    setBloodGroup(event.target.value);
  }

  function handleAddressChange(event) {
    setAddress(event.target.value);
  }

  return (
    <div className="flex">
      <div className="doc-main-2" style={{width:"fit-content",height:"fit-content"}}>
        <div className="top">
          <h1>ADD PATIENT</h1>
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
        <div className="doc-fields" style={{marginTop:"20px"}}>
          <form onSubmit={handleSubmit}>
            <div className="doc-fields2" style={{ display: 'flex' }}>
              <div className="left-doc">
                <label className="pat-details" htmlFor="f-name">
                  Name
                </label>
                <br />
                <br />
                <div className="pat-input">
                  <input
                    type="text"
                    name="f-name"
                    id="f-name"
                    placeholder="Enter name"
                    value={name}
                    onChange={handleFirstNameChange}
                  />
                  <br />    
                </div>
                <p id="fnameerr" className="errrr">
                  {firstNameError}
                </p>
                <br />

                <label className="pat-details" htmlFor="phn">
                  Phone No
                </label>
                <br />
                <br />
                <div className="pat-input" id="pat-inp-spc">
                  <label className="pat-details-spc">+91</label>
                  <input
                    type="tel"
                    name="phn"
                    id="phn"
                    placeholder="XXXXXXXXXX"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                  <br />
                </div>
                <p id="phnerr" className="errrr">
                  {phoneError}
                </p>
                <br />

                <label htmlFor="dob" id='dobl'>Date of Birth</label>
                <br />
                <br />
                <div className="pat-input">
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    placeholder="dd-mm-yyyy"
                    min="1990-01-01" // Minimum date allowed: January 1, 1990
                    max={new Date().toISOString().split('T')[0]} // Maximum date allowed: Current date
                    onChange={handleDateOfBirthChange}
                  />
                  <br />
                </div>

                

              </div>
              <div className="right-doc">
                <div className="sex-dic" style={{width:"100%"}}>
                  <label htmlFor="sex">Sex</label> <br />
                  <div className="username" style={{width:"100%"}}>
                    <select
                      name="sex"
                      id="sex"
                      className="blood_in"
                      value={sex}
                      onChange={handleSexChange}
                    >
                      <option value="none" hidden>
                        Select
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <br></br>
                <div className="blood" style={{width:"100%"}}>
                  <label htmlFor="blood">Blood Group</label>
                  <div className="username" style={{width:"100%"}}>
                    <select
                      name="blood"
                      id="blood"
                      className="blood_in"
                      value={bloodGroup}
                      onChange={handleBloodGroupChange}
                    >
                      <option value="none" hidden>
                        Select
                      </option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
                <label className="pat-details" htmlFor="email">
                  Email Id
                </label><br />{' '}
                <br />
                <div className="pat-input">
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email id"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        validateEmail(e.target.value);
                    }}
                    />
                </div>
                <p id="email-error" className="errrr">
                {emailError}
                </p>{' '}
              </div>

              

            </div>

            <div className="center-doc1" >
                  <label htmlFor="address">Address</label>
                    <div className="username" style={{width:"100%"}}>
                      <textarea
                       style={{marginLeft:"10px",width:"95%"}}
                        name="address"
                        id="address"
                        className="pat-input-ta"
                        value={address}
                        onChange={handleAddressChange}
                      ></textarea>
                    </div>
            </div>

            <button
              type="submit"
              className="signin-button2"
              disabled={firstNameError || phoneError}
            >
              Add Patient
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

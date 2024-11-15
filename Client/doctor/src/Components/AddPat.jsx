import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './pham.css';
import './doc.css';


export default function AddPat() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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

  const navigate = useNavigate();

  function validateFirstname(firstname) {
    if (firstname.length < 3) {
      return 'First name must be at least 3 letters';
    } else if (!/^[a-zA-Z]+$/.test(firstname)) {
      return 'First name must contain only letters';
    } else {
      return '';
    }
  }

  function validateLastname(lastname) {
    if (lastname.length < 3) {
      return 'Last name must be at least 3 letters';
    } else if (!/^[a-zA-Z]+$/.test(lastname)) {
      return 'Last name must contain only letters';
    } else {
      return '';
    }
  }

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

  function handleLastNameChange(event) {
    const value = event.target.value;
    setLastName(value);
    setLastNameError(validateLastname(value));
  }

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

  function handleFormSubmit(event) {
    event.preventDefault();
    if (!firstNameError && !lastNameError && !phoneError) {
      axios
        .post('/patient/add-patient', {
          firstName,
          lastName,
          email,
          phone,
          dateOfBirth,
          sex,
          bloodGroup,
          address,
        })
        .then((response) => {
          // Handle successful submission
          // For example, navigate to another page
          navigate('/prescription');
        })
        .catch((error) => {
          // Handle error
        });
    }
  }

  return (
    <div className="flex">
       {/* <div className="navigation">
                
                <a href="/Homein">
                    <p class='pharm'>Medic+</p>
                </a>
                
                
                    <ul>
                        <div className='li'>
                            <li><button className='Btn'>
                                <div className='sign'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                                </div>
                                    <div className='text'>Home</div>
                            </button></li>
                        </div>
                       
                        <div className='li'>
                            <li>
                                <button className='Btn'>
                                    <div className='sign'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M248 0H208c-26.5 0-48 21.5-48 48V160c0 35.3 28.7 64 64 64H352c35.3 0 64-28.7 64-64V48c0-26.5-21.5-48-48-48H328V80c0 8.8-7.2 16-16 16H264c-8.8 0-16-7.2-16-16V0zM64 256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H224c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H184v80c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V256H64zM352 512H512c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H472v80c0 8.8-7.2 16-16 16H408c-8.8 0-16-7.2-16-16V256H352c-15 0-28.8 5.1-39.7 13.8c4.9 10.4 7.7 22 7.7 34.2V464c0 12.2-2.8 23.8-7.7 34.2C323.2 506.9 337 512 352 512z"/></svg>
                                    </div>
                                    <div className='text'>Medicine Stock</div>
                                </button>
                            </li>
                        </div>

                        <div className='li'>
                            <li>
                                <button className='Btn'>
                                    <div className='sign'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M112 96c-26.5 0-48 21.5-48 48V256h96V144c0-26.5-21.5-48-48-48zM0 144C0 82.1 50.1 32 112 32s112 50.1 112 112V368c0 61.9-50.1 112-112 112S0 429.9 0 368V144zM554.9 399.4c-7.1 12.3-23.7 13.1-33.8 3.1L333.5 214.9c-10-10-9.3-26.7 3.1-33.8C360 167.7 387.1 160 416 160c88.4 0 160 71.6 160 160c0 28.9-7.7 56-21.1 79.4zm-59.5 59.5C472 472.3 444.9 480 416 480c-88.4 0-160-71.6-160-160c0-28.9 7.7-56 21.1-79.4c7.1-12.3 23.7-13.1 33.8-3.1L498.5 425.1c10 10 9.3 26.7-3.1 33.8z"/></svg>
                                    </div>
                                    <div className='text'>Prescriptions</div>
                                </button>
                            </li>
                        </div>


                        <div className='li'>
                            <li>
                                <button className='Btn'>
                                    <div className='sign'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"/></svg>
                                    </div>
                                    <div className='text'>Reports</div>
                                </button>
                            </li>
                        </div>

                        <div className='li'>
                            <li>
                               <button className='Btn'>
                                   <div className='sign'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>
                                    </div>
                                     <div className='text'>Settings</div>
                               </button>
                            </li>
                        </div>
                    </ul>
            </div> */}
      <div className="doc-main-2" style={{width:"fit-content",height:"fit-content",margin:"auto"}}>
        {/* <br /> */}
        <div className="top">
          <h1>ADD PATIENT</h1>
        </div>
        <div className="doc-fields">
          <form onSubmit={handleFormSubmit}>
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
                    value={firstName}
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
              <div className="right-doc" >
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
                    </select>
                  </div>
                </div>
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
                      <option value="a+">A</option>
                      <option value="a-">A-</option>
                      <option value="b+">B+</option>
                      <option value="b-">B-</option>
                      <option value="ab+">AB+</option>
                      <option value="ab-">AB-</option>
                      <option value="o+">O+</option>
                      <option value="0-">O-</option>
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
  `               {emailError}
                </p>{' '}
              </div>

              

            </div>

            <div className="center-doc1">
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
              disabled={firstNameError || lastNameError || phoneError}
            >
              Add Patient
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

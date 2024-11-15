import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { format, parse } from 'date-fns';
import './PatientDetails.css';
import { useNavigate } from "react-router-dom"; // Import CSS file for styling

const PatientDetails = () => {
  const { opno } = useParams(); // Retrieve opno from URL params
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  const handlePatientDetails = async (opno, name) => {
    navigate(`/item/${opno}`, { state: { opno, name } });
  };
  

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/patient/${opno}`);
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [opno]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Patient Details</h1>
      <table className="patient-table">
        <tbody>
          <tr>
            <td>OP Number:</td>
            <td>{patient.opno}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{patient.name}</td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td>{patient.phone}</td>
          </tr>
          <tr>
            <td>Date of Birth:</td>
            <td>{format(patient.dob, 'dd-MM-yyyy')}</td>
          </tr>
          <tr>
            <td>Sex:</td>
            <td>{patient.sex}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{patient.email}</td>
          </tr>
          <tr>
            <td>Blood Group:</td>
            <td>{patient.bloodgroup}</td>
          </tr>
          <tr>
            <td>Address:</td>
            <td>{patient.address}</td>
          </tr>
        </tbody>
      </table>
        <button className='signin-button' style={{ marginTop: "20px" }} onClick={() => handlePatientDetails(patient.opno, patient.name)}
>Prescribe</button>
    </div>
  );
};

export default PatientDetails;

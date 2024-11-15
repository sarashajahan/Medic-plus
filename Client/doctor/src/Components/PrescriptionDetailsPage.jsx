import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PrescriptionDetails.css'; // Import your CSS file
import Alert from '@mui/material/Alert';

function PrescriptionDetailsPage() {
    const { id } = useParams(); // Get the prescription ID from URL parameter
    const [prescription, setPrescription] = useState(null);
    const [opno , setOp] = useState('')
    const [loading, setLoading] = useState(true);
    const [updatedStock, setUpdatedStock] = useState({});
    const [successalert, setAlert1] = useState(null);
    const [erroralert, setAlert2] = useState(null);
    const [done, setDone] = useState(false); // Initialize done state

    useEffect(() => {
        const fetchPrescriptionDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/crud/prescriptions/${id}`);
                setPrescription(response.data);
               
                setLoading(false);
                // Set the done state based on whether the prescription is marked as done in the database
                // if (response.data && response.data.done) {
                //     setDone(true);
                // }
            } catch (error) {
                console.error('Error fetching prescription:', error);
                setLoading(false);
            }
        };

        fetchPrescriptionDetails();
    }, [id]);

    // const handleStockChange = (medicineId, property, value) => {
    //     setUpdatedStock({
    //         ...updatedStock,
    //         [medicineId]: {
    //             ...updatedStock[medicineId],
    //             [property]: value
    //         }
    //     });
    // };

    const formatDate = dateString => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!prescription) {
        return <div>Prescription not found</div>;
    }

    return (
        <div className='flex'>
            <div className='signin-div2'>
                <h2>Prescription Details Page</h2>
                <table className="prescription-table">
                    <tbody>
                        <tr>
                            <th>Prescription ID:</th>
                            <td>{prescription._id}</td>
                        </tr>
                        <tr>
                            <th>Date:</th>
                            <td>{formatDate(prescription.date)}</td>
                        </tr>
                        <tr>
                            <th>Patient Name:</th>
                            <td>{prescription.patientName}</td>
                        </tr>
                        <tr>
                            <th>OP Number:</th>
                            <td>{prescription.opno}</td>
                        </tr>
                        <tr>
                            <th>Age:</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Gender:</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Contact:</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Complaints:</th>
                            <td>{prescription.complaints}</td>
                        </tr>
                        <tr>
                            <th>Diagnosis:</th>
                            <td>{prescription.diagnosis}</td>
                        </tr>
                        <tr>
                            <th>Medication Note:</th>
                            <td>{prescription.medicationNote}</td>
                        </tr>
                        <tr>
                            <th>Investigations:</th>
                            <td>{prescription.investigations}</td>
                        </tr>
                        <tr>
                            <th>Medicines:</th>
                            <td>
                                <table className="medicines-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Duration</th>
                                            <th>Duration Unit</th>
                                            <th>Times</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prescription.medicines.map((medicine, index) => (
                                            <tr key={index}>
                                                <td>{medicine.name}</td>
                                                <td>{medicine.duration}</td>
                                                <td>{medicine.durationUnit}</td>
                                                <td>
                                                    <ul>
                                                        {medicine.times.map((time, index) => (
                                                            <li key={index}>
                                                                Time: {time.time}, Before Food: {time.beforeFood ? 'Yes' : 'No'}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PrescriptionDetailsPage;

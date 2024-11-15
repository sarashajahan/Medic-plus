import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PrescriptionDetails.css';

function PrescriptionDetails() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/crud/prescriptions');
                setPrescriptions(response.data);
            } catch (error) {
                console.error('Error fetching prescriptions:', error);
            }
        };

        fetchPrescriptions();
    }, []);

    useEffect(() => {
        const results = prescriptions.filter(prescription =>
            (prescription.patientName && prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (prescription.opno && prescription.opno.toString().includes(searchTerm))
        );
        setSearchResults(results);
    }, [searchTerm, prescriptions]);

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    const toggleDone = async (id, index) => {
        try {
            await axios.post(`http://localhost:3000/crud/markPrescriptionAsDone/${id}`);
            const updatedPrescriptions = [...prescriptions];
            updatedPrescriptions[index].done = true;
            setPrescriptions(updatedPrescriptions);
            
        } catch (error) {
            console.error('Error marking prescription as done:', error);
        }
    };

    const formatDate = dateString => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className='flex'>
            <div className="prescription-details-container">
                <h2>Prescription Details</h2>
                <div className='form-control'>
                    <input
                        type="text"
                        name="search-bar"
                        id="search-bar"
                        placeholder="Search by Patient Name or OP Number"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className='input input-alt'
                    />
                    <span className='input-border input-border-alt'></span>
                </div>
                <div className="prescription-list">
                    <ul>
                        {searchResults.map((prescription, index) => (
                            <li key={index}>
                                <Link className='link' to={`/prescription/${prescription._id}`}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div className='field'>
                                            <h4>Date: {formatDate(prescription.date)}</h4>
                                        </div>
                                        <div className='field'>
                                            <h4>OP Number: {prescription.opno}</h4>
                                        </div>
                                        <div className='field' style={{ width: "20vw", overflowX: "scroll" }}>
                                            <h4>Patient Name: {prescription.patientName}</h4>
                                        </div>
                                    </div>
                                </Link>
                                {!prescription.done ? (
                                    <button onClick={() => toggleDone(prescription._id, index)} disabled className="toggle-button">Pending</button>
                                ) : (
                                    <button disabled className="toggle-button-done">Done</button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PrescriptionDetails;

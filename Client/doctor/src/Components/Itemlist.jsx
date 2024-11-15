import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

import './pham.css';
import '../App.css';
import './list.css';
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import { format } from 'date-fns'
import { useLocation } from 'react-router-dom';





function ItemList() {
    const location = useLocation();
const opno = location.state.opno;
const patientName = location.state.name;
    const [date, setDate] = useState('');
    // const [patientName, setPatientName] = useState('');
    // const [opno, setOp] = useState('');
    const [medicines, setMedicines] = useState([{ name: '', batch: '',medtype:'', duration: '', durationUnit: 'days', times: [] }]);
    const [complaints, setComplaints] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [medicationNote, setMedicationNote] = useState('');
    const [investigations, setInvestigations] = useState('');
    const [medicineOptions, setMedicineOptions] = useState([]);
    const [successalert, setAlert1] = useState(null);
    const [erroralert, setAlert2] = useState(null);
    const navigate = useNavigate()
    console.log(opno)
    useEffect(() => {
        const currentDate = new Date().toISOString().slice(0, 10);
        setDate(currentDate);
    }, []);

    useEffect(() => {
        const fetchMedicineNames = async () => {
            try {
                const response = await axios.get('http://localhost:3000/crud/items');
                setMedicineOptions(response.data.map(option => ({
                    value: option.medName,
                    label: option.medName,
                    medtype: option.medtype, // Add medType to options
                    batch: option.batch // Add batch to options
                })));
            } catch (error) {
                console.error('Error fetching medicine names:', error);
                setAlert2(error.response.data.error);
                setTimeout(() => {
                    setAlert2('');
                }, 3000);
            }
        };

        fetchMedicineNames();
    }, []);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const list = [...medicines];
        list[index][name] = value;
        setMedicines(list);
    };

    const handleSelectChange = (index, selectedOption) => {
        const list = [...medicines];
        list[index].name = selectedOption.value;
        list[index].medtype = selectedOption.medtype; // Add medType
        list[index].batch = selectedOption.batch; // Add batch
        setMedicines(list);
    };

    const handleCheckboxChange = (index, time, isBeforeFood) => {
        const list = [...medicines];
        const medicine = list[index];
        const timesIndex = medicine.times.findIndex(item => item.time === time);

        if (timesIndex === -1) {
            medicine.times.push({ time, beforeFood: isBeforeFood });
        } else {
            medicine.times.splice(timesIndex, 1); // Remove the item from the array
        }

        setMedicines(list);
    };

    const handleAddMedicine = () => {
        setMedicines([...medicines, { name: '', batch: '', medtype: '', duration: '', durationUnit: 'days', times: [] }]);
    };

    console.log(patientName)
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            medicines.forEach(medicine => {
                console.log('Medicine:', medicine.name, 'Batch:', medicine.batch, 'MedType:', medicine.medtype);
            });
            const response = await axios.post('http://localhost:3000/crud/add-prescription', {
                date,
                patientName,
                opno,
                complaints,
                diagnosis,
                medicines,
                medicationNote,
                investigations
            });
            console.log(response.data);
            if (response.data.status) {
                setAlert1(response.data.msg);
                setTimeout(() => {
                    setAlert1('');
                    navigate('/patient');
                    window.location.reload();
    
                }, 3000);
            } else {
                setAlert2(response.data.error);
            }
        } catch (error) {
            console.error('Error adding prescription:', error);
            setAlert2(error.response.data.error);
            setTimeout(() => {
                setAlert2('');
            }, 3000);
        }
    };
    
    

    return (
        <div className="flex">
            <div className='signin-div2' style={{ marginLeft: '10%', height: "fit-content", width: "80%" }}>
                <div style={{ display: "flex" }}>
                    <h2 style={{ width: "30vw", fontSize: "1.8rem" }}>Add Prescription</h2>
                    <div style={{ marginLeft: "40%", fontSize: "1.1rem", fontWeight: "bolder", width: "20vw", marginTop: "10px" }}>
                        <label>Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            disabled
                            style={{ fontSize: "1.1rem", fontWeight: "bolder" }}
                        />
                    </div>
                </div>
                <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
                    <div className="fields2">
                        <div className='left'>
                            <div style={{ display: "flex" }}>
                                <div>
                                    <label>Patient Name:</label>
                                    <div className='username' style={{ width: "18vw", height: "50%" }}>
                                        <input
                                            type="text"
                                            value={patientName}
                                            // onChange={(event) => setPatientName(event.target.value)}
                                            style={{ height: "4vh" }}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginLeft: "2vw" }}>
                                    <label>Op number:</label>
                                    <div className='username' style={{ width: "fit-content", height: "50%" }}>
                                        <input
                                            type="text"
                                            value={opno}
                                            onChange={(event) => setOp(event.target.value)}
                                            style={{ height: "4vh" }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>Complaints:</label>
                                <div className='username' style={{ width: "80%", height: "50%" }}>
                                    <textarea
                                        value={complaints}
                                        onChange={(event) => setComplaints(event.target.value)}
                                        style={{ width: "96%", height: "10vh" }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Diagnosis:</label>
                                <div className='username' style={{ width: "80%", height: "50%" }}>
                                    <textarea
                                        value={diagnosis}
                                        onChange={(event) => setDiagnosis(event.target.value)}
                                        style={{ width: "96%", height: "10vh" }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Medication Note:</label>
                                <div className='username' style={{ width: "80%", height: "50%" }}>
                                    <textarea
                                        value={medicationNote}
                                        onChange={(event) => setMedicationNote(event.target.value)}
                                        style={{ width: "96%", height: "10vh" }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Investigations:</label>
                                <div className='username' style={{ width: "80%", height: "50%" }}>
                                    <textarea
                                        value={investigations}
                                        onChange={(event) => setInvestigations(event.target.value)}
                                        cols={5}
                                        style={{ width: "96%", height: "10vh" }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='right' style={{ marginLeft: "0px" }}>
                            <label>Medicines:</label>
                            {medicines.map((medicine, index) => (
                                <div key={index} className='med'>
                                    <div>
                                        <div className='one'>
                                            <Select
                                                options={medicineOptions}
                                                value={{ value: medicine.name, label: medicine.name }}
                                                onChange={(selectedOption) => handleSelectChange(index, selectedOption)}
                                                placeholder="Select Medicine"
                                                styles={{ width: "30vw" }}
                                            />
                                            <div style={{ display: "flex", marginLeft: "25%" }}>
                                               
                                                <div className='username' style={{ height: "50%", marginLeft: "10px" }}>
                                                    <input
                                                        type="number"
                                                        placeholder="Duration"
                                                        name="duration"
                                                        min={1}
                                                        value={medicine.duration}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                        style={{ height: "4vh" }}
                                                    />
                                                </div>
                                                <div className='username' style={{ marginLeft: "10px" }}>
                                                    <select
                                                        value={medicine.durationUnit}
                                                        onChange={(event) => handleInputChange(index, event)}
                                                        name="durationUnit"

                                                    >
                                                        <option value="days">Days</option>
                                                        <option value="weeks">Weeks</option>
                                                        <option value="months">Months</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        {['Morning', 'Afternoon', 'Evening', 'Night'].map(time => (
                                            <div key={time} style={{ display: "flex", marginLeft: "20%" }}>
                                                <div>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={medicine.times.some(item => item.time === time && item.beforeFood)}
                                                            onChange={() => handleCheckboxChange(index, time, true)}
                                                        /> Beforefood
                                                    </label>
                                                </div>
                                                <div  >
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={medicine.times.some(item => item.time === time)}
                                                            onChange={() => handleCheckboxChange(index, time, false)}
                                                            style={{ backgroundColor: "red" }}
                                                        /> {time}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={handleAddMedicine} className='signin-button' style={{ width: "3vw", borderRadius: "50%", height: "3vw", marginTop: "10px" }}>+</button>

                        </div>
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
                    <button type="submit" className='signin-button' style={{ marginTop: "20px" }}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default ItemList;

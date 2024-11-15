import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './Search';
import Table from './PatientTable';
import './filter.css';
import './pham.css';
import '../App.css';
import Pagination from './Pagination';

const PAGE_SIZE = 10; // Define your page size here

const Patientsearch = () => {
    const [obj, setObj] = useState({});
    const [patients, setPatients] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [notfound, setNotFound] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const url = `http://localhost:3000/patient/search?page=${page}&search=${search}`;
                const response = await axios.get(url);
                const { data } = response;
                if (data.total === 0) {
                    setNotFound('No patients found.');
                } else {
                    setNotFound('');
                }
                setPatients(data.patients);
                setObj(data);
            } catch (error) {
                console.error('Error fetching patients:', error);
                setNotFound('An error occurred while fetching patients.');
            }
        };

        fetchPatients();
    }, [page, search]);

    return (
        <div className="flex">
            <div className="wrapper">
                <div className="container">
                    <div className="head">
                        <Search setSearch={setSearch} />
                    </div>
                    <div className="body">
                        <div className="table-container">
                            <Table patients={patients} />
                            {notfound && (
                                <div className="notfound">
                                    <img src="../src/assets/error-404.png" className="error-img" alt="Error 404" />
                                    <h1>{notfound}</h1>
                                </div>
                            )}
                            <div style={{marginTop:"20px",marginLeft:"10px"}}>
                                <Pagination
                                        page={page}
                                        limit={obj.limit ? obj.limit : 0}
                                        total={obj.total ? obj.total : 0}
                                        setPage={(page) => setPage(page)}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Patientsearch;

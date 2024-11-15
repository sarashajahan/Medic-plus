import React, { useEffect, useRef } from 'react';
import './doc.css';
import '../App.css'

// import Animatedgif from './Animatedgif';

const DocHome = () => {
    
    return (
        <div className="flex">
            <div className="main">
                <h1>Good Morning Doctor</h1>
                <div className='form-control'>
                    {/* <input type="text" name="search-bar" id="search-bar" placeholder="Search for Patient by Op no..." className='input input-alt'/> <span className='input-border input-border-alt'></span> */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='search__icon'><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                    */}
                </div>

                <div className="quick-actions">
                    <p className="quick">Homepage</p>
                    <div className="quick-act-1">
                        <a href="/AddPatient"><button className="quick-button-1">New Patient</button></a>
                        <p>Add Patient</p>
                        <p>Quickly add Patient to the database</p>
                    </div>
                    <div className="quick-act-2">
                        <a href="/patient"><button className="quick-button-1">Search</button></a>
                        <p>Patient List</p>
                        <p>View the patient list and their data</p>
                    </div>
                    <div className="quick-act-3">
                        <a href="/detail"><button className="quick-button-1">Prescription</button></a>
                        <p>Prescription History</p>
                        <p>View the prescription history of patients</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocHome

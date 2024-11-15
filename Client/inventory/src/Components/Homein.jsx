import React, { useState } from 'react'
import '../App.css'
import './pham.css'
import { useNavigate } from 'react-router-dom'
// import Animatedgif from './Animatedgif';

function Homein(){

    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate()

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const navigateTo = () => {
            navigate('/filter');
    }
    
    return (
        <div className="flex">
           <div className="navigation" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <p class='pharm' style={{ marginLeft: isHovered ? '6rem' : '1rem'}}>Medic+</p>

                <div className='main-nav'>
                    <div className='icons' style={{ marginLeft: isHovered ? '2rem' : '0rem'}}>
                        <ul>
                            <div className='li'>
                                <li><button className='Btn'>
                                    <div className='sign'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" /></svg>
                                    </div>
                                    <div className='text'>Home</div>
                                </button></li>
                            </div>
                            <div className='li'>
                                <li>
                                    <button className='Btn' >
                                        <div className='sign'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M248 0H208c-26.5 0-48 21.5-48 48V160c0 35.3 28.7 64 64 64H352c35.3 0 64-28.7 64-64V48c0-26.5-21.5-48-48-48H328V80c0 8.8-7.2 16-16 16H264c-8.8 0-16-7.2-16-16V0zM64 256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H224c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H184v80c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V256H64zM352 512H512c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H472v80c0 8.8-7.2 16-16 16H408c-8.8 0-16-7.2-16-16V256H352c-15 0-28.8 5.1-39.7 13.8c4.9 10.4 7.7 22 7.7 34.2V464c0 12.2-2.8 23.8-7.7 34.2C323.2 506.9 337 512 352 512z" /></svg>
                                        </div>
                                        <div className='text'>Medicine Stock</div>
                                    </button>
                                </li>
                            </div>
                            <div className='li'>
                                <li>
                                    <button className='Btn'>
                                        <div className='sign'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M112 96c-26.5 0-48 21.5-48 48V256h96V144c0-26.5-21.5-48-48-48zM0 144C0 82.1 50.1 32 112 32s112 50.1 112 112V368c0 61.9-50.1 112-112 112S0 429.9 0 368V144zM554.9 399.4c-7.1 12.3-23.7 13.1-33.8 3.1L333.5 214.9c-10-10-9.3-26.7 3.1-33.8C360 167.7 387.1 160 416 160c88.4 0 160 71.6 160 160c0 28.9-7.7 56-21.1 79.4zm-59.5 59.5C472 472.3 444.9 480 416 480c-88.4 0-160-71.6-160-160c0-28.9 7.7-56 21.1-79.4c7.1-12.3 23.7-13.1 33.8-3.1L498.5 425.1c10 10 9.3 26.7-3.1 33.8z" /></svg>
                                        </div>
                                        <div className='text'>Prescriptions</div>
                                    </button>
                                </li>
                            </div>
                            <div className='li'>
                                <li>
                                    <button className='Btn' >
                                        <div className='sign'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z" /></svg>
                                        </div>
                                        <div className='text'>Reports</div>
                                    </button>
                                </li>
                            </div>
                            <div className='li'>
                                <li>
                                    <button className='Btn' >
                                        <div className='sign'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" /></svg>
                                        </div>
                                        <div className='text'>Settings</div>
                                    </button>
                                </li>
                            </div>
                        </ul>
                    </div>
                    <div className='names' style={{ display: isHovered ? 'block' : 'none'}}>
                        <ul>
                            <li>Home</li>
                            <li style={{marginTop:'5.6rem'}}>Stock</li>
                            <li>Prescriptions</li>
                            <li style={{marginTop:'5.6rem'}}>Reports</li>
                            <li style={{marginTop:'5.3rem'}}>Settings</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="main" >
                <h1 style={{marginLeft : "20%"}}>Medicine Stock</h1>
                <div className='form-control'>
                    <input type="text" name="search-bar" id="search-bar" placeholder="Search for medicine by name..." style={{marginLeft:"10%"}} className='input input-alt' onClick={navigateTo}/> <span style={{marginLeft:"10%"}} className='input-border input-border-alt'></span>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='search__icon'><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                    */}
                </div>

                <div className="quick-actions">
                    <p className="quick">Quick Actions</p>
                    <div className="quick-act-1">
                        <a href="/addmed"><button className="quick-button-1">New Stock</button></a>
                        <p>Add Stock</p>
                        <p>Quickly add stock to your inventory</p>
                    </div>
                    <div className="quick-act-2">
                        <a href="/filter"><button className="quick-button-1">Update Stock</button></a>
                        <p>Update Stock</p>
                        <p>Edit Quantities and expiry dates</p>
                    </div>
                    <div className="quick-act-3">
                        <a href="/filter"><button className="quick-button-1">Delete Stock</button></a>
                        <p>Delete Stock</p>
                        <p>Remove stock from your inventory</p>
                    </div>
                </div>
{/* 
                <div className="stock-actions">
                    <p className="alrt"> Stock Alerts</p>
                    <div className="stock-act-1">
                      
                        <p className='act-1-p'>Paracetamol 500mg</p>
                        <p className='act-1-p'>10 packet, expiring on 12/05/2024</p>
                    </div>
                </div> */}
            </div>
            <div>
                    {/* <Animatedgif src={"../assets/robo.gif"}/> */}
            </div>
        </div>
    )
}

export default Homein

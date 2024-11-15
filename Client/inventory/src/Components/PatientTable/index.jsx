// import styles from "./styles.module.css";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { format } from 'date-fns'
// import '../pham.css'

// const Table = ({ patients }) => {
//     const navigate = useNavigate();

//     // const handleDelete = async (id) => {
//     //     try {
//     //         await axios.delete(`http://localhost:3000/api/patients/${id}`);
//     //         // Refresh data after deletion
//     //         navigate('/filter', { replace: true });
//     //     } catch (error) {
//     //         console.error("Error deleting patient:", error);
//     //         // Handle error
//     //     }
//     // };

//     return (
//         <div className={styles.container}>
//             <div className={styles.heading}>
//                 <p className={styles.title_container} style={{ fontSize: "18px" }}>OP Number</p>
//                 <p className={styles.title_container} style={{ fontSize: "18px" }}>Name</p>
//                 <p className={styles.title_container} style={{ fontSize: "18px" }}>Phone</p>
//                 <p className={styles.title_container} style={{ fontSize: "18px" }}>Date of Birth</p>
//                 <p className={styles.title_container} style={{ fontSize: "18px" }}>Sex</p>
//                 <p className={styles.title_container} style={{ fontSize: "18px" }}>Email</p>
//                 <p className={styles.title_container} style={{ fontSize: "18px" }}>Blood Group</p>
//                 <p className={styles.title_container} style={{ fontSize: "18px" }}>Address</p>
//                 <p className={styles.update_container} style={{ fontSize: "16px" }}>Delete</p>
//             </div>
//             {patients.map((patient) => (
//                 <div className={styles.task} key={patient.opno}>
//                     <div className={styles.title_container} >
//                         <p className={styles.task_nop} style={{ marginTop: "40px" }}>
//                             {patient.opno}
//                         </p>
//                     </div>
//                     <div className={styles.title_container}>
//                         <p className={styles.task_title}>
//                             {patient.name}
//                         </p>
//                     </div>
//                     <div className={styles.title_container} style={{width:"25%"}}>
//                         <p className={styles.task_nop}>{patient.phone}</p>
//                     </div>
//                     <div className={styles.title_container}>
//                         <p className={styles.task_nop}>
//                             {format(new Date(patient.dob), 'dd-MM-yyyy')}
//                         </p>
//                     </div>
//                     <div className={styles.title_container}>
//                         <p className={styles.task_nop}>{patient.sex}</p>
//                     </div>
//                     <div className={styles.title_container}>
//                         <p className={styles.task_nop}>{patient.email}</p>
//                     </div>
//                     <div className={styles.title_container}style={{paddingLeft:"25px"}}>
//                         <p className={styles.task_nop}>{patient.bloodgroup}</p>
//                     </div>
//                     <div className={styles.title_container}>
//                         <p className={styles.task_nop}>{patient.address}</p>
//                     </div>
//                     <div className={styles.update_container}>
//                         <button  className="quick-button-2" style={{ marginLeft: "50px", marginTop: "40px" }}>Delete</button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Table;
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { format } from 'date-fns'

const Table = ({ patients }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/patients/${id}`);
            // Refresh data after deletion
            navigate('/filter', { replace: true });
        } catch (error) {
            console.error("Error deleting patient:", error);
            // Handle error
        }
    };

    return (
        <div className={styles.containertable}>
            <table>
                <thead>
                    <tr>
                        <th>OP Number</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Date of Birth</th>
                        <th>Sex</th>
                        <th>Email</th>
                        <th>Blood Group</th>
                        <th>Address</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.opno}>
                            <td>{patient.opno}</td>
                            <td>{patient.name}</td>
                            <td>{patient.phone}</td>
                            <td>{format(new Date(patient.dob), 'dd-MM-yyyy')}</td>
                            <td>{patient.sex}</td>
                            <td>{patient.email}</td>
                            <td>{patient.bloodgroup}</td>
                            <td>{patient.address}</td>
                            <td>
                                <button onClick={() => handleDelete(patient._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

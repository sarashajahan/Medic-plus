import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {format} from 'date-fns'
import '../pham.css'

const Table = ({ tasks ,syrups }) => {

	// const format1 = 

	const navigate = useNavigate()
	const handleDelete = (id) => {
        axios.delete('http://localhost:3000/crud/delete/'+id)
        .then(res => {
            console.log(res)
            navigate('/filter')
			navigate(0);
        }).catch(err => console.log(err))
    }
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
			<p className={styles.title_container} style={{fontSize:"18px"}}>Batch No:</p>
				<p className={styles.title_container} style={{fontSize:"18px"}}>Item</p>
				<p className={styles.title_container} style={{fontSize:"18px"}}>Quantity</p>
				<p className={styles.expdate_container} style={{fontSize:"16px"}}>Expiry Date</p>
				<p className={styles.expdate_container} style={{fontSize:"16px"}}>Category</p>
				{/* <p className={styles.spp_tab}>Strips per Packet</p>
				<p className={styles.pps_tab}>Pills per Strip</p> */}
				<p className={styles.update_container} style={{fontSize:"16px"}}>Delete</p>
			</div>
			{tasks.map((task) => (
				<Link className={styles.Link} to={`/edit/${task._id}`} ><div className={styles.task} key={task._id}>
					<div className={styles.title_container} >
						<p className={styles.task_nop} style={{marginTop:"40px"}}>
							{task.batch}
						</p>
					</div>
					<div className={styles.title_container}>
						<p className={styles.task_title}>
							{task.medName}
						</p>
					</div>
					<div className={styles.title_container} >
						<p className={styles.task_nop}>{task.ts}</p>
					</div>
					<div className={styles.expdate_container}>
						
							<p  className={styles.task_expdate}>
							{format(task.expdate, 'dd-MM-yyyy')}
								
							</p>
					</div>
					<div className={styles.expdate_container}>
						<p className={styles.task_nop}>{task.medtype}</p>
					</div>

					<div className={styles.update_container}>
					<button onClick={() => handleDelete(task._id)} className="quick-button-2" style={{marginLeft:"50px",marginTop:"40px"}}>Delete</button>
					</div>
				</div></Link>
			))}
		</div>
	);
};

export default Table;

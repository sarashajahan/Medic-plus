import express from 'express'
import cors from 'cors'
const router = express.Router();

import { task } from '../models/tasks.js'

import { prescription } from '../models/prescription.js';



import Task from '../config/tasks.json' assert { type: "json" }


router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });

router.post('/addmed', async (req, res) => {
    try {
        const { batch, medtype, medName, expdate, quantity, nob, nop, spp, pps } = req.body;
        const ts = medtype.toLowerCase() === 'tablet' ? nop * spp : nob;
        
        if (medtype.toLowerCase() == 'tablet') {
            if (!batch || !medName || !expdate || !nop || !spp || !pps) {
                return res.status(400).json({ status: false, error: "Required fields missing" });
            }
        }else{
            if (!batch || !medName || !expdate || !quantity || !nob) {
                return res.status(400).json({ status: false, error: "Required fields missing" });
            }
        }
       

        const tasks = await task.findOne({ batch })
        if (tasks) {
            return res.status(500).json({ status: false , error: "Stock already exists" })
        }

        const newTask = new task({
            medtype,
            batch,
            medName,
            expdate,
            quantity,
            nob,
            nop,
            spp,
            pps,
            ts
        })

        await newTask.save()
        return res.json({ status: true, msg: "Stock registered" })

    } catch (error) {
        console.error("Error adding medication:", error);
        return res.status(500).json({ status: false, error: "Failed to add medication" });
    }

})



router.get('/items', async (req, res) => {
    try {
        const items = await task.find({});
        res.json(items);
        console.log(res)
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).json({status: false, error: 'Internal server error' });
    }
});


router.get('/get/:id', (req, res) => {
    const id = req.params.id
    task.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => console.log(err))
})

router.get("/search", async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";

        const tasks = await task.find({
            medName: {
                $regex: search,
                $options: "i"
            }
        })
            .skip(page * limit)
            .limit(limit);
        console.log(tasks)

        const total = await task.countDocuments({

            medName: { $regex: search, $options: "i" },
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            tasks
        };

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});



router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const { nop, spp, pps, quantity, nob } = req.body;

    try {
        // Find the task by ID and update it
        const updatedTask = await task.findByIdAndUpdate(id, {
            nop: nop,
            spp: spp,
            pps: pps,
            quantity: quantity,
            nob: nob
        }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ status: true, msg: "Task not found" });
        }

        res.json(updatedTask); // Return the updated task
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: true, error: "Server error" });
    }
});



router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    task.findByIdAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err))
})

// const insertTasks = async () => {
//     try {
//         const docs = await task.insertMany(Task);
//         return Promise.resolve(docs);
//     } catch (err) {
//         return Promise.reject(err)
//     }
// };

// insertTasks()
//     .then((docs) => console.log(docs))
//     .catch((err) => console.log(err))

router.post('/add-prescription', async (req, res) => {
    try {
        // Extract prescription data from request body
        const { date, patientName, opno, complaints, diagnosis, medicines, medicationNote, investigations } = req.body;

        // Create a new prescription object using the Mongoose model
        const newPrescription = new prescription({
            date,
            patientName,
            opno,
            complaints,
            diagnosis,
            medicines, // Assuming 'medicines' is an array of objects containing medicine data
            medicationNote,
            investigations
        });

        // Save the prescription to the database
        const savedPrescription = await newPrescription.save();

        // Send success response
        res.status(200).json({ status: true, msg: 'Prescription added successfully', data: savedPrescription });
    } catch (error) {
        // Handle errors
        console.error('Error adding prescription:', error);
        res.status(500).json({ status: false, error: 'Error adding prescription' });
    }
});


router.get('/prescriptions', async (req, res) => {
    try {
        const undonePrescriptions = await prescription.find({ done: false }).sort({ createdAt: 'desc' });
        const donePrescriptions = await prescription.find({ done: true }).sort({ createdAt: 'desc' });
        
        const allPrescriptions = [...undonePrescriptions, ...donePrescriptions];
        
        res.json(allPrescriptions);
        
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/prescriptions/search', async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const prescriptions = await prescription.find({
            $or: [
                { patientName: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search by patient name
                { opno: searchTerm }, // Exact match for OP number
            ],
        });
        res.json(prescriptions);
    } catch (error) {
        console.error('Error searching prescriptions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/prescriptions/:id', async (req, res) => {
    try {
        const prescriptions = await prescription.findById(req.params.id);
        if (!prescriptions) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        res.json(prescriptions);
    } catch (error) {
        console.error('Error fetching prescription:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/updateStock/:id', async (req, res) => {
    const prescriptionId = req.params.id;
    const updatedStockData = req.body;

    try {
        // Loop through the updated stock data and update the stock in the tasks collection
        for (const [medicineId, stockData] of Object.entries(updatedStockData)) {
            // Fetch the task by prescriptionId and medicineId
            const tasks= await task.findOne({  batch: medicineId });

            if (!tasks) {
                return res.status(404).json({ message: `Task not found for medicine ID ${medicineId}` });
            }

            // Update the stock based on the medicine type
            if (tasks.medtype === 'tablet') {
                tasks.nop -= parseInt(stockData.nop);
                tasks.pps -= parseInt(stockData.pps);
                // tasks.ts = tasks.nop*tasks.pps
            } else {
                tasks.nob -= parseInt(stockData.nob);
            }

            // Save the updated task
            await tasks.save();
        }

        res.status(200).json({ message: 'Stock updated successfully' });
    } catch (error) {
        console.error('Error updating stock:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/markPrescriptionAsDone/:id', async (req, res) => {
    const prescriptionId = req.params.id;

    try {
        // Find the prescription by ID
        const prescriptions = await prescription.findById(prescriptionId);

        if (!prescriptions) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        // Update the prescription to mark it as done
        prescriptions.done = true;
        await prescriptions.save();

        res.status(200).json({ message: 'Prescription marked as done' });
    } catch (error) {
        console.error('Error marking prescription as done:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
export { router as taskRouter }
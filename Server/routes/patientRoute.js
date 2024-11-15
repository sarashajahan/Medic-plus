import express from 'express'
import cors from 'cors'
const router = express.Router();
import { patient } from '../models/patient.js';
import { counter } from '../models/counter.js';
//const data = require('./data.json');

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
});

// router.post("/data", async (req,res)=>{
//   const insertTasks = async () => {
//     try {
//         const docs = await patient.insertMany(data);
//         return Promise.resolve(docs);
//     } catch (err) {
//         return Promise.reject(err)
//     }
//   };
  
//   insertTasks()
//     .then((docs) => console.log(docs))
//     .catch((err) => console.log(err))
// })

router.post("/addPatient", async (req, res) => {
  try {
    const { name, phone, dob, sex, blood, email, address } = req.body;
    if (!name || !phone || !dob || !sex || !blood || !email || !address) {
      return res.json({ status: false, error: "Failed to add patient. Missing required fields." });
    }

    
    
    const patients = await patient.findOne({ email });
    if (patients) {
      return res.json({ status:false, msg: "Patient already exists" });
    }

    let Counter = await counter.findOneAndUpdate(
        { id: "opno" },
        { $inc: { seq: 1 } },
        { new: true }
      );
  
      let opno;
      if (!Counter) {
        const newCounter = new counter({ id: "opno", seq: 1000 });
        await newCounter.save();
        opno = 1000;
      } else {
        opno = Counter.seq;
      }

      const newPatient = new patient({
        opno,
        name,
        phone,
        dob,
        sex,
        bloodgroup:blood,
        email,
        address,
      });

    await newPatient.save();
    return res.json({ status: true, msg: "Patient registered" });
  } catch (error) {
    console.error("Error adding new patient : ", error);
    return res.json({ status: false, error: "Failed to register new Patient" });
  }
});

const PAGE_SIZE = 10; // Define page size

router.get("/search", async (req, res) => {
  try {
    
    const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 14; // Default to page 1 if not provided
        const search = req.query.search || "";

    const patients = await patient.find({
      $or: [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive search by name
        { opno: { $regex: search, $options: "i" } } // Case-insensitive search by OP number
      ]
    })
    .skip(page * limit)
    .limit(limit);

    const total = await patient.countDocuments({
      $or: [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive search by name
        { opno: { $regex: search, $options: "i" } } // Case-insensitive search by OP number
      ]
    });

     // Calculate total pages

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      patients
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Import the Patient model

// Endpoint to fetch details of a specific patient
router.get('/:opno', async (req, res) => {
  const opno = req.params.opno;

  try {
    const patients = await patient.findOne({ opno }); // Query MongoDB for the patient with the specified OP number
    if (!patients) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patients); // Return patient details as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});




// router.get("/search", async (req, res) => {
//   try {
//       const page = parseInt(req.query.page) - 1 || 0;
//       const limit = parseInt(req.query.limit) || 10;
//       const search = req.query.search || "";

//       const patients = await patient.find({
//         name: { $regex: search, $options: "i" }, // Case-insensitive search by name
//     })
//       .skip(skip)
//       .limit(PAGE_SIZE);
//       console.log(patients);
 
//       const total = await patient.countDocuments({

//         name: { $regex: search, $options: "i" },
//     });
//     const response = {
//       error: false,
//       total,
//       page: page + 1,
//       limit,
//       patients
//   };
//   res.status(200).json(response);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: true, message: "Internal Server Error" });
//     }
// });



export { router as patientRouter }

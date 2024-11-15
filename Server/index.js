import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()
import { userRouter } from './routes/user.js'

import { taskRouter } from './routes/TaskRoute.js'

import { patientRouter } from './routes/patientRoute.js'

import { doctorRoute } from './routes/doctorRoute.js'
import {otp} from './routes/otp.js'

// const otp = require("./routes/otp.js")


const app = express()
app.use(cookieParser()) 
app.use(cors(
  //   {
  //   origin: 'http://localhost:5173',
  //   credentials:true,            
  //   optionSuccessStatus:200,
  // }
  ))


app.use(express.json())
app.use('/auth', userRouter)
app.use('/crud',taskRouter)
app.use('/patient',patientRouter)
app.use("/api", otp);
app.use("/doctor", doctorRoute);

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connected to database`);
  })
  .catch((er) => {
    console.error(er);
  });


app.listen(process.env.PORT, ()=>{
    console.log("Server is Running")
})


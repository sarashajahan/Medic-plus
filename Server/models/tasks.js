import mongoose from "mongoose";

const medicSchema = new mongoose.Schema({
    batch:{type:String},
    medtype: {type: String},
    medName: {type: String,default:null},
    expdate: {type: Date, },
    quantity: {type: Number, },
    nob: {type: Number, },
    nop: {type: Number, },
    spp: {type: Number, },
    pps: {type: Number, },
    ts: {type: Number},

})

const taskModel = mongoose.model("task", medicSchema)

export {taskModel as task}
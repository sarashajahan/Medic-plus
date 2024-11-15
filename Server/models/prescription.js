import mongoose from "mongoose";

const timeSchema = new mongoose.Schema({
    time: String,
    beforeFood: Boolean
});

const PrescriptionSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    patientName: String,
    opno: Number,
    complaints: String,
    diagnosis: String,
    medicines: [{
        name: String,
        batch: String, // Added batch field
        duration: Number,
        medtype:String,
        durationUnit: { type: String, enum: ['days', 'weeks', 'months'] },
        times: [timeSchema]
    }],
    medicationNote: String,
    investigations: String,
    done: { type: Boolean, default: false } 
});

const PrescriptionModel = mongoose.model('Prescription', PrescriptionSchema);

export { PrescriptionModel as prescription };

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    doctor_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'rejected'],
        default: 'pending',
    },
    data: String,
    time: String,
    payment:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });


const appointmentModel = mongoose.model("Appointment", appointmentSchema)

export default appointmentModel;
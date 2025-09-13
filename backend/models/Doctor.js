import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor_image: {
      type: String,
      default: "",
    },
    doctor_image_id: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "My about...",
    },
    available: {
      type: Boolean,
      default: true,
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    // timings: {
    //     type: Array,
    //     required: true,
    // },
    timings: {
      type: Array,
      default: ["10:00Am - 9-00Pm"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;

import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
// import Appointment from '../models/Appointment.js'

// get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctor = await Doctor.find();

    // console.log(doctor);

    res.status(200).json({ doctor: doctor });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// approve and reject the doctors by admin

export const changeDoctorStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;

    console.log(doctorId, status);
    // const doctor= await Doctor.findById(doctorId);
    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      {
        status,
      },
      { new: true }
    );
    console.log(doctor);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (status === "approved") {
      await User.findByIdAndUpdate(doctor.user_Id, { role: "doctor" });
    } else if (status === "rejected") {
      // await User.findByIdAndUpdate(doctor.user_Id, { role: "user" });
      await Doctor.findByIdAndDelete(doctorId);
    }

    res
      .status(200)
      .json({ message: `Doctor status changed to ${status}`, doctor });
  } catch (error) {
    console.log(error);
    res.status({ message: error.message });
  }
};

// get all appointment
export const getAllAppointment = async (req, res) => {
  const adminUserId = req.user?.id;
  try {
    const appointment = await Appointment.find()
      .populate("user_Id", "name phone")
      .populate({
        path: "doctor_Id",
        populate: { path: "user_Id", select: "name specialization" },
      });
    // console.log(appointment);

    res.status(200).json({ message: "All Appointment ", appointment });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const getDetails = async (req, res) => {
  try {
    const doctor = await Doctor.find();
    const user = await User.find({ role: "user" });
    const appointment = await Appointment.find();

    // console.log(doctor.length);
    // console.log(user.length);
    // console.log(appointment.length);

    const pendingDoctors = doctor.filter((doc) => doc.status === "pending");
    const approvedDoctor = doctor.filter((doc) => doc.status === "approved");
    const rejectedDoctor = doctor.filter((doc) => doc.status === "rejected");
    const pendingAppointment = appointment.filter(
      (app) => app.status === "pending"
    );
    const confirmedAppointment = appointment.filter(
      (app) => app.status === "confirmed"
    );
    const rejectedAppointment = appointment.filter(
      (app) => app.status === "rejected"
    );

    res.status(200).json({
      message: "Admin dashboard",
      user: user.length,
      totalDoctors: doctor.length,
      pendingDoctors: pendingDoctors.length,
      approvedDoctor: approvedDoctor.length,
      rejectedDoctor: rejectedDoctor.length,
      pendingAppointment: pendingAppointment.length,
      confirmedAppointment: confirmedAppointment.lenght,
      rejectedAppointment: rejectedAppointment.length,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// get all the request from user to become doctor for approval

export const getAllDoctorforApproval = async (req, res) => {
  const adminUserId = req.user?.id;

  try {
    const doctor = await Doctor.find({ status: "pending" }).populate(
      "user_Id",
      "name email phone gender image"
    );
    // console.log(doctor);

    res.status(200).json({
      success: true,
      message: "All requested doctor for Approval",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const getDoctorDetailsforApproval = async (req, res) => {
  const doctorId = req.params.id;
  // console.log(id);
  try {
    const doctor = await Doctor.findById(doctorId).populate(
      "user_Id",
      " name phone email image dob"
    );
    res.status(200).json(doctor);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// add Doctor by the admin manually

export const AddDoctor = async (req, res) => {
  try {
    const {
      about,
      specialization,
      experience,
      gender,
      fees,
      timings,
      location,
      user_Id,
    } = req.body;

    const existingDoctor = await Doctor.findOne({ user_Id });

    if (existingDoctor) {
      return res.status(400).json({ message: "Already applied as doctor!" });
    }

    if (
      !about ||
      !specialization ||
      !experience ||
      !gender ||
      !fees ||
      !timings ||
      !location ||
      user_Id
    ) {
      return res.status(400).json({ message: "Filled full Details" });
    }

    let doctor_image = "";
    let doctor_image_id = "";

    if (req.file?.path) {
      doctor_image = req.file.path;
      doctor_image_id = req.file.filename;
    }

    console.log(req.file);

    const newDoctor = new Doctor({
      about: JSON.parse(about),
      specialization,
      experience,
      gender,
      fees,
      timings: JSON.parse(timings),
      location,
      user_Id,
      doctor_image,
      doctor_image_id,
    });

    console.log(newDoctor);

    // await newDoctor
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Api for getting all user
export const getAllUser = async (req, res) => {
  try {
    let { page, limit, search } = req.query;

    // defaults
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    // Search filter
    let filter = { role: "user" };
    if (search) {
      const regex = new RegExp(search, "i"); // case-insensitive search
      filter.$or = [{ name: regex }, { email: regex }, { phone: regex }];
    }

    // Query with filter + pagination
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      page,
      limit,
      totalUsers: total,
      totalPages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

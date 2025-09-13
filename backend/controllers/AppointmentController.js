
import Doctor from "../models/Doctor.js";
import Appointment from '../models/Appointment.js'



export const applyAppointment = async (req, res) => {
    try {
        // const userId= req.user?.id;

        const userId = req.user?.id;

        const { doctorId, time, date } = req.body



        if (!doctorId || !time || !date) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const doctor = await Doctor.findById(doctorId);


        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found!" });
        }

        if (doctor.status !== 'approved') {
            return res.status(404).json({ message: "Doctor not avaliable !" })
        }



        const alreadyBooked = await Appointment.findOne({
            doctor_Id: doctorId,
            date,
            time,
            status: { $ne: "rejected" } // Don't block rejected ones
        });


        if (alreadyBooked) {
            return res.status(409).json({ message: "This slot is already booked." });
        }

        const appointment = new Appointment({
            user_Id: req.user?.id,
            doctor_Id: doctorId,
            time,
            date
        })
        // console.log(appointment);

        // console.log(doctor)
        await appointment.save();

        res.status(200).json({ message: "Appointment to Doctor", appointment });


    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })
    }
}
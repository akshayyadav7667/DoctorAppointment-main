
import express from 'express';
import { authorizeRoles, ProtectedAuth } from '../middleware/Auth.js';
import { doctorDashboard, getDoctorProfile, seeAppointmentDetails, updateDoctorProfile } from '../controllers/DoctorController.js';
import uploadDoctor from '../middleware/multerDoctor.js';
// import { authorizeRoles, ProtectedAuth } from '../middleware/Auth.js';
// import { applyDoctor } from '../controllers/DoctorController.js';

const doctorRoutes=express.Router();

doctorRoutes.get('/profile', ProtectedAuth, authorizeRoles('doctor'), getDoctorProfile)

doctorRoutes.get('/seeAppointment', ProtectedAuth, authorizeRoles('doctor'), seeAppointmentDetails)
doctorRoutes.post('/update-profile', ProtectedAuth, authorizeRoles('doctor'), uploadDoctor.single('doctor_image'), updateDoctorProfile)
doctorRoutes.get('/dashboard-doctor', ProtectedAuth, authorizeRoles('doctor'), doctorDashboard )

export default doctorRoutes;
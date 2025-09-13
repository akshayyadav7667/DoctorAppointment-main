

import express from 'express'
import { authorizeRoles, ProtectedAuth } from '../middleware/Auth.js';
import { applyAppointment } from '../controllers/AppointmentController.js';
import { changeAppointmentStatus } from '../controllers/DoctorController.js';
// import { applyAppointment } from '../controllers/DoctorController.js';

const appointmentRouter= express.Router();


appointmentRouter.post('/applyAppointment', ProtectedAuth, authorizeRoles('user'), applyAppointment)

appointmentRouter.post('/changeAppointment', ProtectedAuth, authorizeRoles('doctor'), changeAppointmentStatus)
export default appointmentRouter

import express from 'express'
import { CancelAppointment, getUserAppointments, loginUser, registerUser, addComments, userProfile, showAllDoctors, updateUserProfile } from '../controllers/UserController.js';
import { authorizeRoles, ProtectedAuth } from '../middleware/Auth.js';
import { applyDoctor } from '../controllers/DoctorController.js';
import uploadUser from '../middleware/multerUser.js';
import uploadDoctor from '../middleware/multerDoctor.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', ProtectedAuth, authorizeRoles("user", "admin","doctor"), userProfile)

userRouter.post('/update-profile', ProtectedAuth, authorizeRoles("user"), uploadUser.single('image'), updateUserProfile )
userRouter.post('/applyDoctor', ProtectedAuth, authorizeRoles('user'), uploadDoctor.single('doctor_image'), applyDoctor)

userRouter.get('/get-appointment', ProtectedAuth, authorizeRoles('user'), getUserAppointments)
userRouter.post('/cancel-appointment', ProtectedAuth, authorizeRoles('user'), CancelAppointment)

userRouter.post('/add-comments/:doctorId', ProtectedAuth, authorizeRoles('user'),addComments)

userRouter.get('/alldoctors',showAllDoctors)
export default userRouter;





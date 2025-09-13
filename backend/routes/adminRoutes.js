import express from "express";
import { authorizeRoles, isAdmin, ProtectedAuth } from "../middleware/Auth.js";
import {
  AddDoctor,
  changeDoctorStatus,
  getAllAppointment,
  getAllDoctorforApproval,
  getDetails,
  getDoctorDetailsforApproval,
} from "../controllers/AdminController.js";
import uploadDoctor from "../middleware/multerDoctor.js";

const adminRouter = express.Router();

// adminRouter.get('/doctors',ProtectedAuth, authorizeRoles('admin'), getAllDoctors );

adminRouter.post("/approve-doctor", ProtectedAuth, isAdmin, changeDoctorStatus);

adminRouter.get(
  "/all-appointments",
  ProtectedAuth,
  authorizeRoles("admin"),
  getAllAppointment
);
adminRouter.get(
  "/dashboard",
  ProtectedAuth,
  authorizeRoles("admin"),
  getDetails
);
adminRouter.get(
  "/allAppovalDoctor",
  ProtectedAuth,
  authorizeRoles("admin"),
  getAllDoctorforApproval
);
adminRouter.post(
  "/addDoctor",
  ProtectedAuth,
  authorizeRoles("admin"),
  uploadDoctor.single("doctor_image"),
  AddDoctor
);
adminRouter.get(
  "/getDoctorIdforAprroval/:id",
  ProtectedAuth,
  authorizeRoles("admin"),
  getDoctorDetailsforApproval
);

export default adminRouter;

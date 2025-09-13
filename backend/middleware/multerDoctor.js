

import multer from "multer";
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import { cloudinary } from "../config/cloudinary.js"
const doctorStorage= new CloudinaryStorage({
    cloudinary,
    params: {
    folder: 'Doctors/DoctorProfiles',    // User images folder
    allowed_formats: ['jpg', 'jpeg', 'png'],
    // public_id: (req, file) => `user-${Date.now()}-${file.originalname.split('.')[0]}`
  }

})
const uploadDoctor= multer({storage:doctorStorage})

export default uploadDoctor


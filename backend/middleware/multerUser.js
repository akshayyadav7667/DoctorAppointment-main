import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { cloudinary } from '../config/cloudinary.js'


const userStorage= new CloudinaryStorage({
    cloudinary,
    params: {
    folder: 'Doctors/UserProfiles',    // User images folder
    allowed_formats: ['jpg', 'jpeg', 'png'],
    // public_id: (req, file) => `user-${Date.now()}-${file.originalname.split('.')[0]}`
  }

})

const uploadUser= multer({storage: userStorage});
export default uploadUser
import dotenv from 'dotenv'
import connectDb from "./config/db.js";
import app from "./app.js";
import { connectCloudinary } from './config/cloudinary.js';


dotenv.config();


connectDb();
connectCloudinary();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})




import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Appointment from '../models/Appointment.js'
import Doctor from "../models/Doctor.js";
import Comment from '../models/comments.js'
import { cloudinary } from '../config/cloudinary.js'




export const registerUser = async (req, res) => {


    const { name, email, password, phone, dob, gender, address, role } = req.body;
    // console.log(req.body)
    // console.log(req.file)

    try {

        if (!email || !name || !password || !phone || !dob || !gender || !address) {
            return res.status(400).json({ message: "Fill the details completely !" });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // console.log(hashedPassword);
        // const image = req.file;

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            dob,
            gender,
            address,
            role
        })


        await newUser.save();

        res.status(201).json({ message: "User data", newUser })


    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json("Invalid Credentials");
        }

        const user = await User.findOne({ email })
        // console.log(user)

        if (!user) {
            return res.status(400).json({message:"User is not found !"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message:"Invalid crenditails"});
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2d"
            }
        );


        res.status(200).json({
            success:true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });



        // console.log(email, password)
        // res.status(200).json({ message: "User is found", others });

    } catch (error) {
        // console.log(error);
         res.status(400).json({ message: "Invalid Credentials" });
    }
}


// get the profile

export const userProfile = async (req, res) => {
    try {

        const id = req.user?.id;

        // console.log(req.user)

        if (!id) {
            return res.status(404).json("Page is not found !");
        }

        const userProfile = await User.findById(id);
        // console.log(userProfile)

        if (!userProfile) {
            return res.status(404).json("User profile not found !");
        }

        const { password, ...others } = userProfile.toObject();



        res.status(200).json({ message: "user profile", others });


    } catch (error) {
        console.log(error);
        res.status(400).json({ errror: error.message });

    }
}



//Update the user profile

export const updateUserProfile = async (req, res) => {

    const userId = req.user?.id;
    const { name, phone, dob, gender, address ,email} = req.body;
    try {
        const user = await User.findById(userId);
        // console.log(req.file);

        if (!user) return res.status(404).json({ message: "User not found!" });

        if (req.file?.path) {
            if (user.imageId) {
                await cloudinary.uploader.destroy(user.imageId)
            }

            
            user.image = req.file.path;        // Cloudinary URL
            user.imageId = req.file.filename;  // Cloudinary public_id
        }


        //  Update other fields if sent
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (dob) user.dob = dob;
        
        if (gender) user.gender = gender;
        if (address) user.address = address;

        if(email && email!==user.email)
        {
            const emailExist= await User.findOne({email});

            if(emailExist)
            {
                return res.status(400).json({message:"Email is already in use"});
            }
            user.email=email;
        }


        await user.save();

        // console.log(user);


        const { password, ...userData } = user.toObject();
        res.status(200).json({ message: "Profile updated successfully", user: userData });




    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}















// get the appointment status

export const getUserAppointments = async (req, res) => {
    const userId = req.user?.id

    try {
        const appointment = await Appointment.find({ user_Id: userId }).populate("user_Id", "name phone").populate("doctor_Id", "specialization experience").sort({ createdAt: -1 });
        // console.log(appointment)
        // console.log(userId);
        res.status(200).json({ message: "User details", appointment });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}


//  cancel the appointment 
export const CancelAppointment = async (req, res) => {
    const userId = req.user?.id;

    const { appointmentId, status } = req.body;


    try {
        const appointment = await Appointment.findOne({ _id: appointmentId, user_Id: userId })

        // console.log(appointment);

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found " });
        }

        // console.log(appointmentId, status);
        appointment.status = status


        await appointment.save();


        // console.log(appointment)

        res.status(200).json({ message: "Cancel the appointment", appointment });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })
    }
}



// add comments to the doctor

export const addComments = async (req, res) => {
    const userId = req.user?.id;
    const { doctorId } = req.params;

    const { commentText } = req.body;


    try {
        const doctor = await Doctor.findById({ _id: doctorId })
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found !" });
        }

        // console.log(userId)
        const comment = new Comment({
            user_Id: userId,
            doctor_Id: doctor._id,
            commentText: commentText

        })

        await comment.save();

        // console.log(comment)


        res.status(200).json({ message: "Comments added ", comment });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}



// show all doctors

export const showAllDoctors = async (req, res) => {
    try {
        const { specialization, gender, experience, fees } = req.query;

        const filter = { status: "approved" };

        if (specialization) {
            filter.specialization = { $regex: specialization, $options: "i" }
        }

        if (gender) {
            filter.gender = gender;
        }

        if (experience) {
            filter.experience = { $gte: Number(experience) };
        }

        if (fees) {
            filter.fees = { $lte: Number(fees) };

        }
        const doctors = await Doctor.find(filter);
        // console.log(doctors);



        res.status(200).json({ message: "Fetched all doctors", doctors });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })
    }
}


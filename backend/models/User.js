import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    // ✅ Store Cloudinary image URL
    image: {
        type: String,
        default: '',
    },

    // ✅ Store Cloudinary image public_id (for deletion)
    imageId: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'doctor', 'admin'],
        default: 'user'
    }

}, { timestamps: true })

const userModel = mongoose.model("User", UserSchema);

export default userModel;
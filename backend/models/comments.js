

import mongoose from "mongoose";

const commentSchema= new mongoose.Schema({
    user_Id:{
        type : mongoose.Schema.Types.ObjectId,
        required:true,
    },
    doctor_Id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    commentText:{
        type:String,
        required:true,
    }
},{timestamps:true})


const Comment= mongoose.model("Comment", commentSchema );

export default Comment;
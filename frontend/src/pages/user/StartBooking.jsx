import React, { useContext } from "react";
import feature from "../../assets/feature-img.png";
import appointment from "../../assets/icon03.png";
// import doctorChat from '../../assets/doc6.png'
import chat from '../../assets/chat.webp';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import { ChartAreaIcon } from "lucide-react";
// import chatIcon from "../../assets/chat-icon.png"; // Add this icon/image to your assets

export default function StartBooking() {

    const {user}= useContext(AuthContext)
    // console.log(userToken,user);
    const navigate= useNavigate();

    const baseUrl= user?.role;

    // console.log(baseUrl);
  return (
    <div className="bg-white py-10 px-4 sm:px-10">
      <h2 className="text-center text-3xl md:text-4xl font-semibold mb-10 text-gray-800">
        Start Your Booking Journey
      </h2>

      {/* Step 1: Register */}
      <div className="flex flex-col sm:flex-row items-center bg-blue-50 rounded-2xl shadow-md overflow-hidden mb-10">
        <div className="flex flex-1 flex-col justify-center items-center p-6 sm:p-10 bg-blue-100">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">Step 1: Register</h3>
          <p className="text-center text-gray-700 mb-6">
            Create your account by filling in all the necessary details to access our services.
          </p>
          <button onClick={()=>navigate('/register')} className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium px-6 py-2 rounded-lg shadow-md">
            Register Now
          </button>
        </div>
        <div className="flex flex-1 p-4 justify-center">
          <img src={feature} alt="Register Illustration" className="w-48 md:w-64 lg:w-80 transition-transform hover:scale-105 duration-300" />
        </div>
      </div>

      {/* Step 2: Book Appointment */}
      <div className="flex flex-col-reverse sm:flex-row items-center bg-orange-50 rounded-2xl shadow-md overflow-hidden mb-10">
        <div className="flex flex-1 p-4 justify-center">
          <img src={appointment} alt="Book Appointment" className="w-44 md:w-64 lg:w-80 transition-transform hover:scale-105 duration-300" />
        </div>
        <div className="flex flex-1 flex-col justify-center items-center p-6 sm:p-10 bg-orange-100">
          <h3 className="text-2xl md:text-3xl font-bold text-orange-800 mb-4">Step 2: Book Appointment</h3>
          <p className="text-center text-gray-800 mb-6">
            Select your preferred doctor, check availability, and schedule a visit with just a few clicks.
          </p>
          <button onClick={()=>navigate(`/${baseUrl}/doctors`)} className="bg-orange-700 hover:bg-orange-800 transition text-white font-medium px-6 py-2 rounded-md shadow">Book Appointment</button>
        </div>
      </div>

      {/* Step 3: Chat & Feedback */}
      <div className="flex flex-col sm:flex-row items-center bg-green-50 rounded-2xl shadow-md overflow-hidden">
        <div className="flex flex-1 flex-col justify-center items-center p-6 sm:p-10 bg-green-100">
          <h3 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">Step 3: Chat & Feedback</h3>
          <p className="text-center text-gray-700 mb-6">
            After your appointment, chat directly with your doctor for follow-up questions and share your feedback to help us improve.
          </p>
          <button onClick={()=>navigate(`/${baseUrl}/chat`)}  className="bg-green-600 hover:bg-green-700 transition text-white font-medium px-6 py-2 rounded-md shadow">
            Chat & Feedback
          </button>
        </div>
        <div className="flex flex-1 p-4 justify-center">
          <img src={chat} alt="Chat with Doctor" className="w-44 md:w-64 lg:w-80 transition-transform hover:scale-105 duration-300 text-green-50" />
        </div>
      </div>
    </div>
  );
}

import React, { useContext } from "react";
import applyDoctor from "../assets/header_img.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function ApplyForDoctor() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const baseUrl = user?.role;
  // console.log("baseUrl", baseUrl);

  // const navigate= useNavigate()

  const handleClick = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Please Login",
        text: "You need to login before applying as a doctor.",
        confirmButtonColor: "#2563EB",
        // footer: "<Login/",
      });
    } else {
      navigate(`/${baseUrl}/applyDoctor`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4 sm:px-8">
      <div className="w-full max-w-6xl bg-linear-to-bl to-ornage-300 from-blue-200 rounded-xl shadow-lg p-8 sm:p-12 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">
            Join Our Medical Community
          </h2>
          <p className="text-gray-700 mb-6 text-md sm:text-lg">
            Are you a passionate and qualified medical professional? Become a
            part of our trusted doctor community and help patients across the
            country receive the care they need. Gain visibility, flexibility,
            and be part of a growing health network.
          </p>

          <ul className="text-gray-600 list-disc pl-5 mb-6 text-left">
            <li>Connect with thousands of patients</li>
            <li>Flexible working hours and online consultation options</li>
            <li>Dedicated support and professional tools</li>
          </ul>

          <button
            onClick={() => handleClick()}
            // onClick={() => navigate(`/${baseUrl}/applyDoctor`)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
          >
            Apply as a Doctor
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={applyDoctor}
            alt="Apply as Doctor"
            className="w-64 md:w-80 lg:w-[22rem] transition-transform hover:scale-105 duration-300"
          />
        </div>
      </div>
    </div>
  );
}

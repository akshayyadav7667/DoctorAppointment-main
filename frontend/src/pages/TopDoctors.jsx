import React from "react";
// import { assets } from '../assets/assets'
import { doctors } from "../assets/assets";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
export default function TopDoctors() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-center  text-orange-500 text-3xl m-10 font-semibold">Our Top Doctors</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.slice(0, 5).map((doctor) => (
          <div
            key={doctor._id}
            className="flex flex-col items-center p-4 shadow-lg   rounded-lg "
          >
            <img
              src={doctor.image}
              alt=""
              className="hover:bg-blue-500 transform transition hover:shadow border-0 rounded-lg duration-300 w-full object-cover"
            />
            <div className="flex items-center gap-2 mt-3">
                   <h3 className="text-gray-700 font-semibold mt-5  text-lg truncate">{doctor.name}</h3>
                   <img src={assets.verified_icon} alt="" className="w-4 mt-4" />
            </div>
         
            {/* <p>{doctor.about}</p> */}

            <div className="flex justify-around w-full mt-2">
              <p className="text-orange-400 font-bold">{doctor.speciality}</p>
              <p className="text-orange-400 font-bold">{doctor.degree}</p>
            </div>
            <div className="flex justify-around w-full mt-2">
              <p className="text-green-500 font-bold">
                {doctor.fees} <span>₹</span>{" "}
              </p>
              <p className="font-semibold text-gray-700">{doctor.experience}</p>
            </div>
            <button className="bg-blue-500 text-white px-8 py-2 mt-3 mb-4 rounded-lg shadow-md hover:bg-blue-400">
              <Link
                to={`/doctors/${doctor._id}`}
                className=" text-white "
              >
                View Profile
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

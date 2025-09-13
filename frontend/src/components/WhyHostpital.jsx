import React from "react";
import first from "../assets/first.png";
import second from "../assets/second.png";
import three from "../assets/three.webp";
// import four from "../assets/four.png";

export default function WhyHostpital() {
  return (
    <div className="py-10">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 mb-14 ml-4">Why MedConnect</h2>
      <div className="grid grid-cols-2  md:grid-cols-4  space-y-1 md:space-y-10 p-2">
        <div className="flex relative flex-col p-8 bg-blue-500 text-white">
          <span className="absolute top-0  -translate-y-1/2">
            <img
              src={first}
              alt=""
              className="w-15 h-15 bg-blue-500 border-5 text-white rounded-full p-2"
            />
          </span>
          <h2>Top Doctors</h2>
          <p>India's award-winning doctors with unmatched credentials</p>
        </div>
        <div className="flex relative flex-col p-8 bg-blue-400 text-white">
          <span className="absolute top-0  -translate-y-1/2">
            <img
              src={second}
              alt=""
              className="w-15 h-15 border-5 bg-blue-500 text-white rounded-full p-2"
            />
          </span>
          <h2>Expert Opinion</h2>
          <p>
            Professional and ethical medical advice on complex medical
            conditions
          </p>
        </div>
        <div className="flex relative flex-col p-8 bg-blue-500 text-white">
          <span className="absolute top-0  -translate-y-1/2">
            <img
              src={three}
              alt=""
              className="w-15 h-15 border-5 bg-blue-500 text-white rounded-full p-2"
            />
          </span>
          <h2>Personalized Service</h2>
          <p>Patient centric platform focused on improving health outcomes</p>
        </div>
        <div className="flex relative flex-col p-8 bg-blue-400 text-white">
          <span className="absolute top-0  -translate-y-1/2">
            <img
              src={first}
              alt=""
              className="w-15 h-15 border-5 bg-blue-500 text-white rounded-full p-2"
            />
          </span>
          <h2>Affordable</h2>
          <p>Avoid unnecessary medical procedures and travel cost</p>
        </div>
      </div>
    </div>
  );
}

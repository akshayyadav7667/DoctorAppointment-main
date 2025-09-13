import React from "react";
import bannerImage from "../assets/header_img.png";

export default function Banner() {
  return (
    <div>
      <div className="flex flex-col md:flex-row ">
        {/* left */}
        <div className="flex-1 ml-2 md:ml-10  flex flex-col justify-center p-4  md:p-10">
          <h2 className="text-4xl mb-10 md:text-5xl  text-blue-600 font-semibold">We Empower Patients</h2>
          <p className="text-gray-600  w-full md:w-[80%]">
            Connect with our award-winning super-specialists for first opinion,
            second opinion or follow-up if you've questions on an existing
            medical condition, a possible surgery or a treatment. Few simple
            steps - Register as a patient on mobile or web app, search for your
            trusted doctor & send request for appointment
          </p>
          <button className="px-4 py-2  mt-8 w-[10rem] bg-blue-500 text-white ">Start Now</button>
        </div>

        {/* left end */}

        {/* right start */}
        <div className="flex-1 flex justify-center bg-blue-400 rounded-br-3xl rounded-tl-full">
          <img src={bannerImage} alt="" className="w-[24rem] md:w-[30rem] " />
        </div>

        {/* right end */}
      </div>
    </div>
  );
}

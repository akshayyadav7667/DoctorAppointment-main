import React from "react";
import about from '../assets/aboutme.png'
import india from '../assets/india.png'

export default function About() {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-around items-center p-10 bg-blue-50 gap-10">
        <div className="flex flex-col md:w-2/3 ">
          <h2 className="text-xl md:text-3xl mb-10">WE ARE MEDIBUDDY. AN END-TO-END DIGITAL HEALTHCARE PLATFORM.</h2>
          <p className="text-gray-700">
            When the webslinger wears his red and blue suit, he's ready to save
            a life. Same rule applies to us at MediBuddy. We’re no fictional
            superhero, but we do know how to weave a web of doctors, hospitals,
            healthcare providers, pharmaceuticals, and insurance companies to
            create a world of possibilities for people looking for healthcare
            assistance.
          </p>{" "}
          <br />
          <p className="text-gray-700">
            Online doctor consultations, lab test bookings, medicine delivery,
            corporate health and wellness services - we make sure each and every
            healthcare need is taken care of.
          </p>
        </div>
        <div className="flex md:w-1/3  justify-center">
          <img src={about} alt="" className="w-72 md:w-96 lg:w-[28rem] object-cover" />
        </div>
      </div>


      {/*  */}


      <div className="mt-10">
        <div className=" p-6">
          <h2 className="text-center m-10 text-lg">Having World Class Delivery Capabilities & Trusted By </h2>

          <div className="flex flex-wrap justify-center gap-2">
            <div className="bg-blue-400 border-2-white flex flex-col justify-center items-center p-4 md:p-10">
              <h2 className="text-5xl text-white font-bold mb-2">500+</h2>
              <p className="text-white">Doctor</p>
            </div>
            <div className="bg-blue-400 border-2-white flex flex-col justify-center items-center p-10">
              <h2 className="text-5xl text-white font-bold mb-2">500+</h2>
              <p className="text-white">Doctors</p>
            </div>
            <div className="bg-blue-400 border-2-white flex flex-col justify-center items-center p-10">
              <h2 className="text-5xl text-white font-bold mb-2">1L+</h2>
              <p className="text-white">Patients</p>
            </div>
            <div className="bg-blue-400 border-2-white flex flex-col justify-center items-center p-10">
              <h2 className="text-5xl text-white font-bold mb-2">200+</h2>
              <p className="text-white">lab Partners</p>
            </div>
            <div className="bg-blue-400 border-2-white flex flex-col justify-center items-center p-10">
              <h2 className="text-5xl text-white font-bold mb-2">100+</h2>
              <p className="text-white">Hospital</p>
            </div>
          </div>
        </div>
        
      </div>


      <div className="relative  flex flex-col  items-center mb-10">
        <h2 className="py-10 text-xl md:text-2xl text-gray-700 text-center px-3 ">1000+ EMPLOYEES. 12 LOCATIONS. 1 VISION.</h2>
        <img src={india} alt="" className="w-2/3 rounded-lg shadow-lg p-4 object-cover bg-blue-50" />
      </div>




      
    </div>
  );
}

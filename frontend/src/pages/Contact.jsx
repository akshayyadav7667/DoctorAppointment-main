import React from "react";
import Benefits from "../components/Benefits";
import contactus from "../assets/contact_image.png";
// import { Contact2Icon } from "lucide-react";
import { PhoneCallIcon } from "lucide-react";
import { Mail } from "lucide-react";
import { LocationEdit } from "lucide-react";

export default function Contact() {
  return (
    <div className="mx-6 md:mx-15 my-6 md:my-10">
      
      {/* Header Section */}
      <div>
        <h2 className="text-3xl md:text-4xl text-blue-500 font-semibold">
          Consult a doctor online with MedConnect
        </h2>

        <p className="text-gray-800 mt-5 md:mt-10 mx-auto ">
          At MedConnect, we aim to provide quality healthcare services to all.
          Situations such as busy schedules, traffic, long queues, or
          unaffordability can get in the way of seeking proper medical aid.
          Hence, MedConnect partners with top hospitals and leading healthcare
          institutions across the country to make sure that expert doctors are
          just a tap away. Our website and doctor consultation app enable you
          to consult a doctor from any location. We have doctors in every city,
          across various specialties and super-specialties, treating numerous
          medical conditions.
        </p>
      </div>

      {/* Career Section */}
      <div className="flex flex-col md:flex-row mt-10 md:mt-15 gap-8">
        {/* Text Part */}
        <div className="flex-1 md:mt-10">
          <h2 className="text-3xl text-blue-600 font-semibold">
            Careers at MedConnect
          </h2>
          <p className="mt-4">
            If you’re looking for a career with MedConnect, or if you’re a
            doctor looking to partner with us, please get in touch here.
          </p>
          <p className="mt-2">
            So many ways to reach us — online, by email, over a call, in your
            city, or even on social media.
          </p>
          

          <div className="space-y-4">
            <h2 className="text-3xl text-orange-500 mt-5 mb-5">Contact us</h2>
            <div className="flex  gap-5">
              <PhoneCallIcon className="text-green-500"/> 
              <p className="text-blue-700 font-semibold">+91 7667750662</p>
              <p className="text-blue-700 font-semibold">+91 8967542897</p>
            </div>
            <div className="flex gap-5">
              <Mail className="text-yellow-500 "/>
              <p className="text-gray-700">akshaykumar88034@gmail.com</p>
            </div>
            <div className="flex gap-5">
              <LocationEdit className=" text-red-500"/>
              <p className="text-gray-800 ">road no 5, kakadev , new Delhi,  India </p>
            </div>
          </div>

          <button className="bg-green-500 mt-15 text-white cursor-pointer  px-8 py-4 flex gap-4">
            <PhoneCallIcon/>
            <p>Call now </p>
            
          </button>
        </div>

        {/* Image Part */}
        <div className="flex-1 flex justify-center">
          <img
            src={contactus}
            alt="Contact Us"
            className="w-[22rem] md:w-[40rem] rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Benefits Component */}
      {/* <div className="mt-12">
        <Benefits />
      </div> */}
    </div>
  );
}

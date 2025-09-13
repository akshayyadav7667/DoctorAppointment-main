import React from "react";
import { assets } from "../../assets/assets";

import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaCcApplePay } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export default function FooterDoctor() {
  const navItems = [
    { to: "/doctor", label: "Home" },
    { to: "/doctor/about", label: "About" },
    // { to: "/doctor/doctors", label: "Doctors" },
    { to: "/doctor/appointments", label: "My Appointments" },
    { to: "/doctor/profile", label: "Profile" },
    { to: "/doctor/contact", label: "Contact" },
    { to: "/doctor/blogs", label: "Blogs" },
  ];

  const socailLinks = [
    {
      to: "/user/instagram",
      label: "Instagram",
    },
    {
      to: "/user/linkedin",
      label: "linkdin",
    },
    {
      to: "/user/youtube",
      label: "Youtube",
    },
    {
      to: "/user/facebook",
      label: "Facebook",
    },
    {
      to: "/user/whatsapp",
      label: "Whatsapp",
    },
    {
      to: "/user/twitter",
      label: "Twitter",
    },
  ];

  return (
    <div>
      <div className=" bg-gray-800  text-gray-200 text-sm">
        <div className=" flex flex-col  md:flex-row px-10 py-8">
          <div className="flex-3/5 space-y-4  ">
            <h3 className="text-lg  md:text-xl  lg:text-2xl ">
              Sign up for our free Good Health Newsletter
            </h3>
            <p className="text-sm md:text-lg lg:text-xl ">
              Get wellness tips to help you live happier and healthier
            </p>
            <div>
              <input
                type="text"
                placeholder="Enter your email address"
                className="px-4 py-2 md:px-4 md:py-3 border-0 w-[220px] md:w-[270px] lg:w-[310px] bg-white text-gray-700 mt-4 "
              />
              <button className="py-2 px-2 md:px-4 md:py-3 w-[80px] md:w-[100px] lg:w-[120px] bg-yellow-500 border-0 text-gray-700 font-semibold cursor-pointer">
                Submit
              </button>
            </div>
          </div>
          <div className="flex-2/5 flex justify-around lg:justify-between gap-5  mt-4">
            <div className="  space-y-4 mt-5 ">
              <h3>Follow WebMD on Social Media</h3>
              <div className="flex gap-4 text-lg mt-4 md:text-xl lg:text-2xl">
                <FaInstagram className="text-pink-500" />
                <FaFacebook className="text-blue-500" />
                <FaYoutube className="text-red-500" />
                <FaWhatsapp className="text-green-500" />
              </div>
            </div>
            <div className=" mt-5  space-y-4">
              <h3 className="text-sm md:text-lg lg:text-xl">
                Download WebMD App
              </h3>
              <p className="flex gap-4 text-xl md:text-2xl lg:text-3xl">
                <FaPlay className="text-violet-200" />
                <FaCcApplePay className="text-cyan-400 " />
              </p>
            </div>
          </div>
        </div>

        <div className="flex  md:flex-row  gap-5 justify-around">
          <div>
            <ul className="space-y-3 text-gray-400 ">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  <NavLink to={item.to}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ul className="space-y-3 text-gray-400">
              {socailLinks.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  <NavLink to={item.to}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div>
              <img
                src={assets.group_profiles}
                alt=""
                className="w-24 md:w-28 lg:w-32 object-cover"
              />
              <p className="mt-5 text-gray-300">Our Organisation</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-center text-gray-300 p-5 mt-4">
            2025 Consult Now 24/7. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

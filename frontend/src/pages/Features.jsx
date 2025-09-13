import React from "react";
import feature from "../assets/feature-img.png";
import freature1 from "../assets/hero-img01.png";
import { MessageSquareText } from "lucide-react";
import { Hospital } from "lucide-react";
import { FlaskConical } from "lucide-react";
import { Pill } from "lucide-react";

import {
  SearchCheck,
  NotebookPen,
  Contact,
  CalendarCheck,
  IndianRupee,
  Share2,
  Video,
  ScrollText,
} from "lucide-react";
import Benefits from "../components/Benefits";

const steps = [
  { icon: SearchCheck, label: "Download mobile App" },
  { icon: NotebookPen, label: "Register or Login" },
  { icon: Contact, label: "Find Doctor" },
  { icon: CalendarCheck, label: "Schedule Appointment" },
  { icon: IndianRupee, label: "Make Payment" },
  { icon: Share2, label: "Share Medical Reports" },
  { icon: Video, label: "Video Consultation" },
  { icon: ScrollText, label: "Receive e-Prescription" },
];

const data = [
  {
    icons: MessageSquareText,
    data: "Information on Medical Treatments in India",
  },
  {
    icons: Hospital,
    data: "Health Packages",
  },
  {
    icons: FlaskConical,
    data: "Lab Servies",
  },
  {
    icons: Pill,
    data: "Online Medicine Delivery",
  },
];
export default function Features() {
  return (
    <div className="bg-white py-15 ">
      <h2 className="text-3xl  font-bold text-center text-gray-700 mb-15">
        Easy Steps For Consultation
      </h2>

      <div className="relative  ">
        {/* Line Behind Icons */}
        <div className="absolute top-10 left-0 right-0 h-1 bg-orange-500 z-0 mx-6 md:mx-20 lg:mx-32" />

        {/* Steps */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 px-6 md:px-20 lg:px-32 relative z-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center w-24">
              <div className="bg-white border-4 border-orange-500 p-3 rounded-full shadow-md">
                <step.icon className="text-blue-500 w-6 h-6" />
              </div>
              <p className="text-center text-sm font-semibold mt-2 text-gray-700">
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex  items-center flex-col-reverse  md:flex-row  mt-30 py-10 px-4">
        <div className="flex flex-1 flex-col mt-10 ml-10 md:mt-0 ">
          <h1 className="text-3xl mb-10 text-gray-700">wherever, whenever.</h1>
          <p className="text-gray-700">
            Whether you're living in India or abroad, easily connect with
            country's top doctors in all specialty areas. You can use SeekMed if
            you've questions on an existing or new condition, a possible surgery
            or about your current treatment. SeekMed is a complete tele-medicine
            platform and we pride ourselves in having the best quality doctors
            in our team
          </p>
        </div>

        <div className="flex flex-1 justify-center  ">
          <img src={feature} alt="" />
        </div>
      </div>




      
   







      <div className="flex flex-col sm:flex-row  items-center gap-4 md:gap-8 m-2 ">
        <div className="w-1/3 bg-blue-50 flex justify-center items-center rounded-full ">
          <img src={freature1} alt="" className=" flex justify-center " />
        </div>

        <div className="w-2/3">
          <h2 className="text-center mt-8 mb-10 text-3xl md:text-4xl">Additional Offerings</h2>

          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4  ">
            {data.map((item) => (
              <div key={item.data} className="p-6 flex flex-wrap items-center  bg-orange-50  shadow-lg ">
                <item.icons className="w-10 h-10 text-orange-500" />
                <p className="mt-5 ml-4 text-gray-600">{item.data}</p>
              </div>
            ))}
          </div>
        </div>
      </div>




    </div>
  );
}

import React, { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

const Data = [
  {
    id: 1,
    title: "Is SeekMed app available for all platforms?",
    content:
      "SeekMed platform is available on Android, iOS and Web application. You can use our services from any device (smartphones, desktops, laptops or tablets).",
  },
  {
    id: 2,
    title: "What is the registration process for doctors?",
    content:
      "There are two ways for a doctor to register with us — by clicking a button apply at the bottom of the site and filling out a doctor registration form or directly in the mobile or web app. Either ways, our panel of doctors will review each submission before the account is activated for use. This may take a week's time.",
  },
  {
    id: 3,
    title:
      "I’ve seen other apps that serve similar purpose. What makes yours any different?",
    content:
      "SeekMed is an expert and second opinion focused global tele-health platform. We pride ourselves in providing professional and ethical medical advice. Our platform provides access to India's highly rated tertiary care providers and top doctors via video consultations.",
  },
  {
    id: 4,
    title: "How do I get an appointment for video consultation?",
    content:
      "After registering on mobile or web app, patient can submit request for appointment by going to doctor's profile. Once doctor creates an appointment, patient can upload scans/reports via chat window and make online payment. Doctor initiates the video call at the time of appointment and provides e-prescription at the end of consultation.",
  },
  {
    id: 5,
    title:
      "I'm looking for a surgical procedure done in India. How can SeekMed help?",
    content:
      "SeekMed has partnered with some of the largest hospital chains and other specialty setups in India. We not only connect international patients with our top surgeons but also assist with cost estimates, visa processing documents and other logistical services for smooth stay during the course of treatment.",
  },
];

export default function Faq() {
  const [openItemId, setOpenItemId] = useState(null);

  const toggleItem = (id) => {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="flex flex-col items-center px-4 py-10 ">
      <h2 className="text-3xl pb-10 pt-5 text-orange-600 font-semibold">
        Frequently Asked Questions
      </h2>

      {Data.map((item) => (
        <div
          key={item.id}
          className="w-full md:w-[65%] bg-orange-50 rounded-md mb-4 overflow-hidden transition-all duration-300 ease-in-out"
        >
          {/* Header row */}
          <div
            className="flex justify-between items-center px-4 py-4 cursor-pointer hover:bg-orange-300  transition-colors"
            onClick={() => toggleItem(item.id)}
          >
            <h3 className="text-gray-700 font-medium group-hover:text-white">
              {item.title}
            </h3>
            {openItemId === item.id ? (
              <ArrowUp className="w-4 text-gray-600 group-hover:text-white" />
            ) : (
              <ArrowDown className="w-4 text-gray-600 group-hover:text-white" />
            )}
          </div>

          {/* Expandable content */}
          <div
            className={`px-4 text-gray-600 bg-orange-100 transition-all duration-300 ease-in-out ${
              openItemId === item.id
                ? "max-h-[500px] opacity-100 py-4"
                : "max-h-0 opacity-0 py-0"
            } `}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}

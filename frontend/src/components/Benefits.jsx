import React from "react";
import sideImage from "../assets/faq-img.png";
import { Smartphone } from "lucide-react";
import { Armchair } from "lucide-react";
import { HandCoins } from "lucide-react";
import { AlarmClockPlus } from "lucide-react";
import { ShieldOff } from "lucide-react";
import { BriefcaseMedical } from "lucide-react";

export default function Benefits() {
  return (
    <div className="py-10">
      <div className="flex flex-col md:flex-row ">
        <div className="flex justify-center md:p-10 items-centerbg-cyan-50">
          <img
            src={sideImage}
            alt=""
            className="w-[18rem] md:w-[28rem] object-cover"
          />
        </div>

        {/*  */}

        <div className="flex-1  mt-12 ml-5 space-y-4">
          <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold">
            Benefits of Consult Now 24/7
          </h2>
          <h2 className="text-2xl md:text:3xl text-gray-700">
            7 Benefits of Instant Online Doctor Consultation
          </h2>

          <div className="flex justify-center items-center gap-4  md:gap-8">
            <Smartphone className="w-10 h-10 text-orange-400" />
            <div >
              <h2 className="text-orange-400 font-semibold mb-1 ">Accessibility</h2>
              <p className="text-gray-700 ">
                Instant access to healthcare professionals irrespective of
                geographical barriers, ensuring medical guidance from anywhere
                at any time.
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-8">
            <Armchair className="w-10 h-10 text-orange-400" />
            <div >
              <h2 className="text-orange-400 font-semibold mb-1 ">Accessibility</h2>
              <p className="text-gray-700 ">
                Instant access to healthcare professionals irrespective of
                geographical barriers, ensuring medical guidance from anywhere
                at any time.
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-8">
            <HandCoins className="w-10 h-10 text-orange-400" />
            <div >
              <h2 className="text-orange-400 font-semibold mb-1 ">Cost-Efficiency</h2>
              <p className="text-gray-700 ">
                Affordable consultations at a fixed nominal fee, avoiding
                additional expenses related to travel and other overheads
                associated with in-person visits.
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-8">
            <AlarmClockPlus className="w-10 h-10 text-orange-400" />
            <div >
              <h2 className="text-orange-400 font-semibold mb-1 ">Timely Assistance</h2>
              <p className="text-gray-700 ">
                Swift response to non-emergency medical queries, ensuring timely
                attention and guidance from experienced healthcare
                professionals.
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-8">
            <ShieldOff className="w-10 h-10 text-orange-400" />
            <div >
              <h2 className="text-orange-400 font-semibold mb-1 ">Secure Communication</h2>
              <p className="text-gray-700 ">
                Utilizes secure digital platforms for communication, ensuring
                privacy and confidentiality of patient information during
                consultations.
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-8">
            <BriefcaseMedical className="w-10 h-10 text-orange-400" />
            <div >
              <h2 className="text-orange-400 font-semibold mb-1 ">Expert Medical Opinion</h2>
              <p className="text-gray-700 ">
                Facilitates interactions with certified doctors having vast
                experience, providing valuable medical insights and guidance for
                various health concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// import './styles.css';

// import required modules
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";

import doctor1 from "../assets/doc2.png";
import doctor2 from "../assets/doc9.png";
import doctor3 from "../assets/doc4.png";
import doctor4 from "../assets/doc5.png";
import doctor5 from "../assets/doc6.png";
import doctor6 from "../assets/doc12.png";
import { Link } from "react-router-dom";

const doctorsData = [
  {
    id: 1,
    image: doctor1,
    content: "Heart Health Specialist",
    desc: "Expert in heart health with 15+ years experience. Specializing in preventive cardiology and non-invasive treatments.",
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
  },
  {
    id: 2,
    image: doctor2,
    content: "Child Care Expert",
    desc: "Caring pediatrician focused on child development and preventive care. Gentle approach with young patients.",
    name: "Dr. Michael Chen",
    specialization: "Pediatrics",
  },
  {
    id: 3,
    image: doctor3,
    content: "Bone & Joint Specialist",
    desc: "Joint and sports injury specialist. Advanced techniques in minimally invasive orthopedic surgery.",
    name: "Dr. Robert Davis",
    specialization: "Orthopedics",
  },
  {
    id: 4,
    image: doctor4,
    content: "Skin Care Expert",
    desc: "Skin health expert with focus on cosmetic and medical dermatology. Specializes in acne and anti-aging treatments.",
    name: "Dr. Amanda Wilson",
    specialization: "Dermatology",
  },
  {
    id: 5,
    image: doctor5,
    content: "Brain & Nerve Specialist",
    desc: "Headache and migraine specialist. Advanced diagnostics for neurological disorders with compassionate care.",
    name: "Dr. James Thompson",
    specialization: "Neurology",
  },
  {
    id: 6,
    image: doctor6,
    content: "Mental Wellness Expert",
    desc: "Mental wellness expert combining therapy and medication management. Specializes in anxiety and depression.",
    name: "Dr. Priya Patel",
    specialization: "Psychiatry",
  },
];

export default function Header() {
  return (
    <div>
      <Swiper
        navigation={true}
        spaceBetween={3}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        className="mySwiper"
      >
        {doctorsData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex justify-between items-center px-1 md:px-8 bg-blue-50">
              <div className=" flex-1 ml-6 md:ml-12">
                <h1 className="text-4xl  md:text-6xl font-semibold ">
                  {item.content}
                </h1>
                <p className="mb-2 text-gray-700  mt-5 text-sm md:text-lg ">{item.desc}</p>

                <h3 className="text-[#E44400] mb-10 font-semibold  ">
                  {item.specialization}
                </h3>

                <Link className="p-3 md:p-5 bg-blue-600  text-white hover:bg-blue-50 hover:text-blue-700  transition border duration-300">
                  Appointment now
                </Link>
              </div>
              <div className="flex-1">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-[400px] md:h-[500px] lg:h-[650px] object-cover "
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}



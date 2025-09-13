import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, doctors } from "../assets/assets";
// import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

export default function SingleDoctor() {
  const { docId } = useParams();

  // const { user } = useContext(AuthContext);

  const { backendUrl, userToken } = useContext(AuthContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const daysofWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Fetch doctor info
  const fetchDocInfo = () => {
    const doc = doctors.find((doc) => doc._id === docId);
    setDocInfo(doc);
  };

  // Generate available slots
  const getAvailableSlot = () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      // Adjust start time
      if (i === 0) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 0 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;

        const isSlotAvailable =
          !docInfo?.slots_booked?.[slotDate]?.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 45);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    try {
      if (!slotTime) return alert("Please select a time slot first!");
      alert(`Booking confirmed at ${slotTime}`);

      const selectedDate = docSlots[slotIndex][0]?.dateTime;
      const formattedDate = `${selectedDate.getDate()}_${
        selectedDate.getMonth() + 1
      }_${selectedDate.getFullYear()}`;

      console.log(formattedDate, slotTime);

      const response = await axios.post(
        backendUrl + "/api/appointment/applyAppointment",
        {
          date: formattedDate,
          time: slotTime,
          doctorId: docInfo._id,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log(response.data);

      // console.log(slotTime,"KJKJKJDF",docSlots[slotIndex][0].dateTime)
      // Backend call yahan lagega in future
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch doctor info when ID changes
  useEffect(() => {
    fetchDocInfo();
  }, [docId]);

  // Generate slots when docInfo is ready
  useEffect(() => {
    if (docInfo) {
      getAvailableSlot();
    }
  }, [docInfo]);

  return (
    <div className="px-[5%] py-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Image */}
        <div>
          <img
            src={docInfo?.image}
            alt=""
            className="bg-blue-500 w-full sm:max-w-72 rounded-lg"
          />
        </div>

        {/* Doctor Info */}
        <div className="bg-white flex-1 border border-gray-400 px-4 md:px-10 py-7 mx-2 sm:mx-0 rounded-lg">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo?.name}
            <img src={assets.verified_icon} alt="" className="w-5" />
          </p>

          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo?.degree} - {docInfo?.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo?.experience}
            </button>
          </div>

          <div className="mt-3">
            <p className="flex items-center gap-1 text-sm font-medium text-gray-500">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-2 mb-2">
              {docInfo?.about}
            </p>
          </div>

          <p className="font-medium">
            Appointment fee:{" "}
            <span className="text-green-600 font-semibold sm:text-xl">
              {docInfo?.fees} <span>$</span>
            </span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="sm:ml-72 sm:pl-4 mt-6 font-medium text-gray-700">
        <p className="text-lg mb-2">Booking Slots</p>

        {/* Day Selection */}
        <div className="flex gap-2 overflow-x-auto  mb-8">
          {docSlots.map((daySlots, index) => {
            const date = daySlots[0]?.dateTime;
            // console.log(daySlots)
            // console.log(index,date)
            // console.log(daySlots.map(slot=>slot.getDate()))
            // console.log("date",date)
            return (
              <button
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`min-w-[60px]  py-6 border-gray-400 cursor-pointer border shadow rounded-3xl ${
                  slotIndex === index ? "bg-blue-500 border-0  text-white" : ""
                }`}
              >
                <p className="text-sm font-semibold">
                  {date?.getDate()}/{date?.getMonth() + 1}
                </p>
                <p className="text-xs">{daysofWeek[date?.getDay()]}</p>
              </button>
            );
          })}
        </div>

        {/* Time Slots */}
        <div className="flex flex-wrap gap-3 mt-4">
          {docSlots[slotIndex]?.map((slot, index) => (
            <button
              key={index}
              onClick={() =>
                setSlotTime(slotTime === slot.time ? "" : slot.time)
              }
              className={`px-4 py-2 border rounded-full cursor-pointer ${
                slotTime === slot.time ? "bg-blue-500 text-white" : ""
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>

        {/* Book Button */}
        <div className="mt-6">
          <button
            onClick={bookAppointment}
            disabled={!slotTime}
            className={`${
              !slotTime ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            } bg-gradient-to-br to-blue-500 from-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md`}
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

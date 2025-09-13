// import React, { useEffe } from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

export default function Specialities() {
  // const [specialist, setSpecialist] = useState("");

  // useEffect(() => {
  //   console.log(specialist);
  // }, [specialist]);

  return (
    <div className="flex flex-col items-center py-16 gap-4 ">
      <h1 className="text-3xl text-gray-700 font-semibold">
        Find by Speciality
      </h1>
      <p className="text-gray-600 text-center text-sm">
        Simply brower through our extensive list of trusted doctors, schedule
        your appointment hassle-free
      </p>
      <div className="flex sm:justify-center items-center gap-5 pt-5 w-full overflow-scroll ">
        {specialityData.map((item) => (
          <Link
            className="flex flex-col items-center text-sm hover:translate-y-[-10px] transform transition duration-300 "
            key={item.speciality}
            to={`/doctors/${item.speciality}`}
            //onClick={() => setSpecialist(item.speciality)}
          >
            <img src={item.image} alt="" className="w-16 sm:w-20 mb-2 " />
            <span>{item.speciality}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

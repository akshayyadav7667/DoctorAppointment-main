import { useState, useEffect } from "react";
import { specialityData } from "../assets/assets";
import { doctors } from "../assets/assets";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Doctors() {
  const { speciality } = useParams();
  // const {user}= useContext(A)
  const {user}= useContext(AuthContext)
  const navigate = useNavigate();
  // const [category, setCategory] = useState(speciality);

  // const [filterDoctor, setFilterDoctor] = useState([]);
  const [category, setCategory] = useState(speciality || "");
  const [filterDoctor, setFilterDoctor] = useState([]);


  // Detect base route according to user role
 const basePath =
  user?.role === "admin"
    ? "/admin"
    : user?.role === "doctor"
    ? "/doctor"
    : user?.role === "user"
    ? "/user"
    : "";


  // Update category from URL
  useEffect(() => {
    setCategory(speciality || "");
  }, [speciality]);



  // Filter doctors whenever category changes
  useEffect(() => {
    if (category) {
      setFilterDoctor(doctors.filter((doc) => doc.speciality === category));
    } else {
      setFilterDoctor(doctors);
    }
  }, [category]);




  const handleChangeSpeciality = (clickedSpeciality) => {
    // Toggle: if already selected, deselect
    if (category === clickedSpeciality) {
      setCategory("");
      // navigate("/doctors"); // remove URL param
      navigate(`${basePath}/doctors`);
    } else {
      setCategory(clickedSpeciality);
      // navigate(`/doctors/${clickedSpeciality}`);
      navigate(`${basePath}/doctors/${clickedSpeciality}`);
    }
  };

  // const handleChangeSpeciality = (speciality) => {
  //   console.log(speciality);
  //   setCategory(speciality === category ? "" : speciality);
  //   navigate(`/doctors/${speciality}`);
  // };

  // const filterDoctors = () => {
  //   if (category) {
  //     const filtered = doctors.filter((item) => item.speciality === category);
  //     setFilterDoctor(filtered);
  //   } else {
  //     setFilterDoctor(doctors);
  //   }
  // };

  // useEffect(() => {
  //   filterDoctors();
  // }, [category]);

  return (
    <div className="flex flex-col md:flex-row h-full ">
      <div className="w-full md:w-3/12 lg:w-2/9 p-4">
        <div className="flex flex-col  items-start space-y-2">
          {specialityData.map((item) => (
            <button
              key={item.speciality}
              onClick={() => handleChangeSpeciality(item.speciality)}
              className={`rounded w-full text-sm px-5 py-2 transition-all ${
                category === item.speciality
                  ? "bg-blue-500 text-white"
                  : "bg-blue-50 hover:bg-blue-200"
              }`}
            >
              {item.speciality}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full  md:w-9/12  lg:w-7/9 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-3  ">
          {filterDoctor.map((item) => (
            <div
              className="flex  flex-col bg-blue-50  rounded-xl transition-all  duration-300 m-10 md:m-2 "
              // onClick={() => navigate(`/doctor/${item._id}`)}
               onClick={() => navigate(`${basePath}/doctor/${item._id}`)}
              key={item._id}
            >
              {/* <img src={item.image} alt="" className="bg-blue-50 w-full rounded-t-2xl border-0  hover:bg-gradient-to-bl hover:from-blue-700 hover:to-indigo-300 transition-all duration-300 " /> */}
              <div className="bg-blue-50 rounded-t-2xl overflow-hidden transition-all duration-300 hover:bg-gradient-to-bl hover:from-blue-700 hover:to-indigo-300">
                <img src={item.image} alt="" className="w-full border-0" />
              </div>

              <div className="flex flex-col justify-between  w-full  items-center p-6 md:p-3">
                <h2 className="font-semibold text-lg text-blue-600">
                  {item.name}
                </h2>
                <div className="flex mt-2 justify-around w-full">
                  <span className="font-semibold text-sm  text-gray-700">
                    {item.speciality}
                  </span>
                  <span className="text-gray-700 text-sm font-semibold">
                    {" "}
                    {item.degree}
                  </span>
                </div>
                <div className="flex mt-2 w-full justify-around">
                  <div className="flex items-center gap-1 text-green-400 font-semibold">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                    Available
                  </div>

                  <span className="text-sm ">{item.experience}</span>
                  <span className="text-green-600 text-sm  font-bold">
                    {item.fees}Rs
                  </span>
                </div>
                <button className="mt-4 mb-4 cursor-pointer w-full bg-gradient-to-br from-blue-600 to-blue-400 hover:bg-orange-300 text-white py-2 rounded-md text-sm transition-all duration-300">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

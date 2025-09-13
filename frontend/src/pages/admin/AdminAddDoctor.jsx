import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { IoPersonAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function AdminAddDoctor() {
  const { backendUrl, userToken, user } = useContext(AuthContext);
  const role = user?.role;
  const navigate = useNavigate();

  // console.log(role);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: "",
    fees: "",
    gender: "",
    doctor_image: null,
    about: "",
    user_Id: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [waitingDoctors, setWaitingDoctor] = useState([]);

  // const backendUrl = "http://localhost:8800/api";
  // const userToken = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "doctor_image") {
      setFormData({ ...formData, doctor_image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const data = new FormData();

      for (const key in formData) {
        data.append(key, formData[key]);
        console.log(formData[key]);
      }
      // console.log(data);

      await axios.post(`${backendUrl}/admin/add-doctor`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          // "Content-Type": "multipart/form-data",
        },
      });

      // console.log(response.data);

      setSuccessMsg(" Doctor added successfully!");
    } catch (err) {
      setError(err.response?.data?.message || " Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovalDoctor = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/allAppovalDoctor`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // console.log(data);

      if (data.success) {
        console.log(data.doctor);
        setWaitingDoctor(data.doctor);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchApprovalDoctor();
  }, [userToken]);

  const handleOpen = (id) => {
    console.log(id);
    navigate(`/${role}/add-doctors/${id}`);
  };

  return (
    <div className=" mx-auto  m-10 bg-linear-to-br bg-blue-50 to-white  shadow-md rounded-lg p-6">
      <div>
        <h2 className="text-3xl text-orange-600 font-semibold text-center mb-6">
          Add New Doctor
        </h2>
        <p></p>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {successMsg && (
          <p className="text-green-600 text-center mb-4">{successMsg}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-[2%] md:p-[5%] bg-gray-100"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Name Field */}
            <div className="flex flex-col">
              <label htmlFor="name" className="font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium text-gray-700 mb-1">
                User_ID
              </label>
              <input
                type="User_Id"
                id="user_id"
                name="user_Id"
                onChange={handleChange}
                placeholder="Enter user_Id"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col">
              <label
                className="font-medium text-gray-700 mb-1"
                htmlFor="specialization"
              >
                specialization
              </label>
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-1">
                experience
              </label>
              <input
                type="number"
                name="experience"
                placeholder="Experience (years)"
                value={formData.experience}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="gender"
                className="font-medium text-gray-700 mb-1"
              >
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                required
                value={formData.gender} // if you're using controlled input
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter email"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="fees">Fees</label>
              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                placeholder="Fees"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="about">About</label>

              <textarea
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="about"
                id="about"
                required
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="doctor_image"
                onChange={handleChange}
                accept="image/*"
                required
                className="w-full p-2 border rounded bg-white"
              />
            </div>
            {
              // doctor_image ===null ? <p>kjdfkd</p>: <p>kdjfkjd</p>
            }
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-[300px]  bg-blue-600 text-white py-2 m-5 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Submitting..." : "Add Doctor"}
          </button>
        </form>
      </div>

      {/* Approve the doctor  */}

      <div>
        <h2 className="text-4xl  text-blue-600 capitalize font-semibold my-10">
          Approve the Doctor
        </h2>
        <div className="flex flex-col space-y-4 ">
          {waitingDoctors.map((doc) => (
            <div
              key={doc._id}
              className="relative flex flex-col md:flex-row justify-between p-4 mb-4 rounded-lg shadow-md bg-blue-50 hover:bg-blue-100 transition"
            >
              {/* Doctor Image */}
              <div className="flex justify-center md:justify-start md:w-1/4 mb-4 md:mb-0">
                {doc.doctor_image && (
                  <img
                    src={doc.doctor_image}
                    alt={`${doc.specialization} doctor`}
                    className="w-28 h-28 rounded-full border-2 border-sky-400 shadow-md object-cover transition-transform duration-300 hover:scale-105"
                  />
                )}
              </div>

              {/* Info Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 flex-1 px-2">
                {/* Basic Info */}
                <p className="text-gray-700">
                  <strong className="text-blue-500">Name:</strong>{" "}
                  <span className="text-gray-900">{doc.user_Id?.name}</span>
                </p>
                <p className="text-gray-700">
                  <strong className="text-blue-500">Email:</strong>{" "}
                  <span className="text-orange-700">{doc.user_Id?.email}</span>
                </p>
                <p className="text-gray-700">
                  <strong className="text-blue-500">Phone:</strong>{" "}
                  <span className="text-gray-800">
                    <span className="text-green-700 font-semibold">
                      {doc.user_Id?.phone}
                    </span>
                  </span>
                </p>

                {/* Professional Info */}
                <p className="text-gray-700">
                  <strong className="text-blue-500">Gender:</strong>{" "}
                  {doc.gender}
                </p>
                <p className="text-gray-700">
                  <strong className="text-blue-500">Specialization:</strong>{" "}
                  {doc.specialization}
                </p>
                <p className="text-gray-700">
                  <strong className="text-blue-500">Experience:</strong>{" "}
                  {doc.experience} years
                </p>
                <p className="text-gray-700">
                  <strong className="text-blue-500">Fees:</strong>{" "}
                  <span className="text-green-600">₹{doc.fees}</span>
                </p>
                <p className="text-gray-700">
                  <strong className="text-blue-500">Location:</strong>{" "}
                  {doc.location}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex md:flex-col gap-3 md:gap-4 mt-4 md:mt-0 md:ml-4">
                <button
                  onClick={() => handleOpen(doc._id)}
                  className=" cursor-pointer bg-blue-500 px-4 py-2 text-white rounded-md shadow-md hover:bg-blue-700 flex items-center justify-center"
                >
                  <FaArrowRightToBracket />
                </button>

                <button className=" cursor-pointer bg-green-600 px-4 py-2 text-white rounded-md shadow-md hover:bg-green-700 flex items-center justify-center">
                  <IoPersonAdd />
                </button>

                <button className=" cursor-pointer bg-red-500 px-4 py-2 text-white rounded-md shadow-md hover:bg-red-700 flex items-center justify-center">
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

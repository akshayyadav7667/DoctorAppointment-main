import React, { useContext, useState } from "react";
import image from "../assets/appointment_img.png";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { backendUrl } = useContext(AuthContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    dob: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(data);

    const response = await axios.post(`${backendUrl}/api/user/register`, data);

    console.log(response);

    setData({
      name: "",
      email: "",
      phone: "",
      password: "",
      gender: "",
      dob: "",
      address: "",
    });

    navigate("/login");
  };

  return (
    <div className="h-full">
      <div className="flex flex-col lg:flex-row h-full ">
        {/* left */}
        <div className="flex flex-1 flex-col items-center justify-center p-4">
          <h2 className="text-5xl mb-8 text-[#E44400] font-semibold ">
            Register{" "}
          </h2>
          <p className="mb-5 text-gray-500 text-sm leading-tight">
            Our healthcare specialist staff will respond within 24 hours
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 w-full max-w-md px-4 "
          >
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={data.email}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="border w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your Email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                value={data.phone}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="border w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your Phone"
              />
            </div>

            {/* password field */}
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={data.password}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, password: e.target.value }))
                }
                className="border w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your Password"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Gender</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={data.gender === "male"}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, gender: e.target.value }))
                    }
                  />
                  Male
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={data.gender === "female"}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, gender: e.target.value }))
                    }
                  />
                  Female
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={data.gender === "other"}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, gender: e.target.value }))
                    }
                  />
                  Other
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="dob">DOB</label>
              <input
                type="date"
                id="dob"
                value={data.dob}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="border w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="address">Address</label>
              <textarea
                rows="4"
                id="address"
                value={data.address}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, address: e.target.value }))
                }
                placeholder="Enter your Address"
                className="w-full border border-gray-200 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button
              type="submit"
              className="w-full mb-8 p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 cursor-pointer"
            >
              Submit
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-gray-700 text-center">
            Don't have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* right */}
        <div className="flex-1 flex justify-center rounded-tl-full bg-blue-500">
          <img src={image} alt="" className="w-full max-w-md object-contain" />
        </div>
      </div>
    </div>
  );
}

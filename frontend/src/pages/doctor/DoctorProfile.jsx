import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import uploadIcon from "../../assets/upload_area.png";
import axios from "axios";
import toast from "react-hot-toast";

export default function DoctorProfile() {
  const { user, userToken, backendUrl } = useContext(AuthContext);
  const [doctor, setDoctor] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("experience", parseInt(doctor.experience));
      formData.append("fees", parseInt(doctor.fees));
      formData.append("location", doctor.location);
      formData.append("specialization", doctor.specialization);
      formData.append("about", doctor.about); // for object like bio
      formData.append("gender", doctor.gender);
      formData.append("timings", JSON.stringify(doctor.timings)); // for array
      formData.append("available", doctor.available);
      formData.append("status", doctor.status);
      // formData.append("bio",doctor.bio);

      if (selectedImage) {
        formData.append("doctor_image", selectedImage);
      }

      // console.log(selectedImage);

       await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // console.log(response.data);

      toast.success("Profile updated successfully");
      setIsEdit(false);
      fetchDoctorProfile();
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save changes");
    }
  };

  const fetchDoctorProfile = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/doctor/profile`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.data.success) {
        setDoctor(response.data.doctor);
        console.log(response.data.doctor);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch doctor profile");
    }
  };

  useEffect(() => {
    if (user) {
      fetchDoctorProfile();
    }
  }, [userToken]);

  if (!doctor) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading Doctor Profile...
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white  rounded-lg m-10 overflow-hidden">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-400 to-indigo-400 h-36 relative">
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
          <label htmlFor="image-upload" className="cursor-pointer">
            <img
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : doctor.doctor_image || uploadIcon
              }
              alt=""
            />
          </label>
          {/* <img
            src={doctor.doctor_image || uploadIcon}
            alt="Doctor"
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
          /> */}
          {isEdit && (
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 pb-10 px-6 md:px-12">
        <h2 className="text-2xl md:text-3xl text-center font-bold text-gray-800">
          Dr. {user.name}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 text-gray-700">
          <div className="flex space-x-2 items-center">
            <p className="font-semibold">Email:</p>
            <p className="text-sm text-green-500 font-semibold ">{user.email}</p>
          </div>
          <div className="flex space-x-2 items-center">
            <p className="font-semibold">Phone:</p>
            <p className="text-sm text-gray-700 ">{user.phone}</p>
          </div>
          <div className="flex space-x-2 items-center">
            <p className="font-semibold">Gender:</p>
            {isEdit ? (
              <select
                value={doctor.gender}
                onChange={(e) =>
                  setDoctor((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="bg-gray-100 px-2 py-1 text-sm font-medium mt-1"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <p className="text-sm  capitalize text-blue-600 ">{doctor.gender}</p>
            )}
          </div>
          <div className="flex space-x-2 items-center">
            <p className="font-semibold">Experience:</p>
            {isEdit ? (
              <input
                type="number"
                value={doctor.experience}
                className="bg-gray-100 px-2 py-1 text-sm font-medium mt-1"
                onChange={(e) =>
                  setDoctor((prev) => ({
                    ...prev,
                    experience: e.target.value,
                  }))
                }
              />
            ) : (
              <p className="text-sm text-red-500 font-semibold">{doctor.experience} years</p>
            )}
          </div>
          <div className="flex space-x-2 items-center">
            <p className="font-semibold">Fees:</p>
            {isEdit ? (
              <input
                type="number"
                value={doctor.fees}
                className="bg-gray-100 px-2 py-1 text-sm font-medium mt-1"
                onChange={(e) =>
                  setDoctor((prev) => ({ ...prev, fees: e.target.value }))
                }
              />
            ) : (
              <p className="text-sm text-green-600 font-bold">₹{doctor.fees}</p>
            )}
          </div>
          <div className="flex space-x-2 items-center">
            <p className="font-semibold">Location:</p>
            {isEdit ? (
              <input
                type="text"
                value={doctor.location}
                className="bg-gray-100 px-2 py-1 text-sm font-medium mt-1"
                onChange={(e) =>
                  setDoctor((prev) => ({ ...prev, location: e.target.value }))
                }
              />
            ) : (
              <p className="text-sm text-gray-600 font-sans ">{doctor.location}</p>
            )}
          </div>
          <div className="flex space-x-2 items-center">
            <p className="font-semibold">Specialization:</p>
            {isEdit ? (
              <input
                type="text"
                value={doctor.specialization}
                className="bg-gray-100 px-2 py-1 text-sm font-medium mt-1"
                onChange={(e) =>
                  setDoctor((prev) => ({
                    ...prev,
                    specialization: e.target.value,
                  }))
                }
              />
            ) : (
              <p className="text-sm text-red-500 font-semibold">{doctor.specialization}</p>
            )}
          </div>
          <div className="flex space-x-2 items-center">
            <p className="font-semibold">Timings:</p>
            {isEdit ? (
              <textarea
                value={doctor.timings.join(", ")}
                onChange={(e) =>
                  setDoctor((prev) => ({
                    ...prev,
                    timings: e.target.value
                      .split(",")
                      .map((item) => item.trim()),
                  }))
                }
                className="bg-gray-100 px-2 py-1 text-sm font-medium mt-1 w-full"
              />
            ) : (
              <p className="text-sm text-green-600 font-semibold">{doctor.timings.join(", ")}</p>
            )}
          </div>
          <div className="flex space-x-2 items-center">
            <p className="font-semibold">Status:</p>
            <p
              className={`text-sm font-medium capitalize ${
                doctor.status === "approved"
                  ? "text-green-600"
                  : doctor.status === "pending"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {doctor.status}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-semibold">About:</p>
          {isEdit ? (
            <textarea
            rows="12" 
              value={doctor?.about}
              onChange={(e) =>
                setDoctor((prev) => ({ ...prev, about: e.target.value }))
              }
              className="bg-gray-100 px-4 py-2 text-sm  mt-2 w-full"
            />
          ) : (
            <p className="text-sm text-gray-600 mt-1">{doctor?.about}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center">
          {isEdit ? (
            <button
              onClick={handleSave}
              className="inline-block cursor-pointer bg-gradient-to-br from-green-400 to-green-700 transition text-white font-medium py-2 px-8 rounded-md"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="inline-block cursor-pointer bg-gradient-to-b from-blue-500 to-indigo-700 hover:bg-blue-700 transition text-white font-medium py-2 px-8 rounded-md"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

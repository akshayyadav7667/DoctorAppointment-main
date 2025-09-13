import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import imageLogo from "../../assets/upload_area.png";
import toast from "react-hot-toast";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { user, userToken, setUserToken, setUser, backendUrl } =
    useContext(AuthContext);

  const [isedit, setIsEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      formData.append("dob", user.dob);
      formData.append("gender", user.gender);
      formData.append("address", user.address);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      // console.log(formData);

      await axios.post(backendUrl + "/api/user/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      // console.log(response.data);

      setIsEdit(!isedit);
    } catch (error) {
      toast.error("Failed to save changes", error.message);
    }
  };

  const handleLogOut = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("userToken");
      setUserToken("");
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/");
    }
  };

  if (!user)
    return (
      <p className="text-center mt-10 text-gray-600">Loading Profile...</p>
    );

  return (
    <div className="max-w-4xl mx-auto m-10 bg-white rounded-xl overflow-hidden">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-400 to-blue-300 h-32 relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-16">
          <label htmlFor="image-upload" className="cursor-pointer">
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : user.image || imageLogo
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            {isedit && (
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            )}
          </label>
        </div>
      </div>

      {/* Profile Details */}
      <div className="pt-20 pb-10 px-6 md:px-12 text-center">
        {isedit ? (
          <input
            type="text"
            className="bg-gray-100 px-2 py-1 text-xl font-medium max-w-60 mt-4"
            value={user.name}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <h2 className="text-xl md:text-3xl font-bold text-gray-700">
            {user.name}
          </h2>
        )}

        <p className="text-sm mb-4 capitalize text-green-600 font-semibold mt-2">
          <span className="text-orange-600">UserID :- </span>
          {user._id}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mt-6 text-gray-700">
          <div className="flex space-x-4 items-center">
            <p className="font-semibold">Email:</p>
            <p className=" text-indigo-500 text-md leading-tight font-sans ">
              {user.email}
            </p>
          </div>
          <div className="flex space-x-4 items-center">
            <p className="font-semibold">Phone:</p>

            {isedit ? (
              <input
                type="text"
                value={user.phone}
                className="bg-gray-100 text-md font-medium max-w-60 mt-3 px-2 py-1 rounded-md"
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-md font-mono text-green-600">{user.phone}</p>
            )}
          </div>
          <div className="flex space-x-4 items-center">
            <p className="font-semibold">Date of Birth:</p>
            <p className="text-sm text-red-600">
              {isedit ? (
                <input
                  type="date"
                  value={user.dob?.split("T")[0]} // convert ISO to yyyy-mm-dd format
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  className="border px-3 py-1 rounded-md text-sm"
                />
              ) : (
                new Date(user.dob).toLocaleDateString()
              )}
            </p>
          </div>
          <div className="flex space-x-4 items-center">
            <p className="font-semibold">Gender:</p>
            {isedit ? (
              <input
                type="text"
                value={user.gender}
                className="bg-gray-100 text-md px-3 rounded-md py-1"
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, gender: e.target.value }))
                }
              />
            ) : (
              <p className="text-sm capitalize font-semibold text-blue-600">
                {user.gender}
              </p>
            )}
          </div>
          <div className="flex space-x-4 items-center sm:col-span-2">
            <p className="font-semibold">Address:</p>
            {isedit ? (
              <input
                type="text"
                value={user.address}
                className="bg-gray-100 text-md px-3 rounded-md py-1 w-full"
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, address: e.target.value }))
                }
              />
            ) : (
              <p className=" text-green-600 text-md ">{user.address}</p>
            )}
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-10 flex  justify-between  px-8">
          {isedit ? (
            <button
              onClick={() => handleSave()}
              className=" ml-10 inline-block cursor-pointer bg-gradient-to-br from-green-400 to-green-700  transition text-white font-medium py-2 px-8 rounded-md "
            >
              Save Change
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(!isedit)}
              className=" ml-10  inline-block cursor-pointer bg-gradient-to-b from-blue-500 to-indigo-700  hover:bg-blue-700 transition text-white font-medium py-2 px-8 rounded-md "
            >
              Edit Profile
            </button>
          )}

          <button
            onClick={() => handleLogOut()}
            className="px-3 rounded-lg bg-gradient-to-b from-red-500 to-orange-700 cursor-pointer hover:bg-orange-800 text-white font-medium"
          >
            <span className="flex gap-2">
              <LogOut />
              LogOut
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

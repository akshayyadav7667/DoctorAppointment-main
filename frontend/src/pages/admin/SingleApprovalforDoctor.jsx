import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

export default function SingleApprovalforDoctor() {
  const { backendUrl, userToken } = useContext(AuthContext);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${backendUrl}/api/admin/getDoctorIdforAprroval/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
      setData(response.data.data || response.data);
    } catch (error) {
      console.log(error);
      setMessage({ text: "Failed to load doctor details", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      setActionLoading(true);
      // API call to approve doctor

      //   approve-doctor

      const data = {
        doctorId: id,
        status: "approved",
      };

      const response = await axios.post(
        `${backendUrl}/api/admin/approve-doctor`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log(response);

      setMessage({ text: "Doctor approved successfully", type: "success" });
      // Refresh data after approval
      setTimeout(() => fetchData(), 1000);
    } catch (error) {
      console.log(error);
      setMessage({ text: "Failed to approve doctor", type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setActionLoading(true);
      // API call to reject doctor
      const data = {
        doctorId: id,
        status: "rejected",
      };

      const response = await axios.post(
        `${backendUrl}/api/admin/approve-doctor`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log(response);

      setMessage({ text: "Doctor rejected", type: "success" });
      // Refresh data after rejection
      setTimeout(() => fetchData(), 1000);
    } catch (error) {
      console.log(error);
      setMessage({ text: "Failed to reject doctor", type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-lg font-medium text-gray-600">
          Loading doctor details...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Failed to load doctor details. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl md:max-w-6xl mx-auto">
        {/* Header with breadcrumb */}
        <nav className="mb-6 flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer">
                  Admin Dashboard
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer">
                  Doctor Approvals
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium text-gray-500">
                  {data.user_Id?.name || "Doctor Details"}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Status message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500  to-indigo-500 text-white p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Doctor Approval Request</h2>
                <p className="text-blue-100 mt-1">
                  Review and verify doctor profile information
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    data.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {data.status?.charAt(0).toUpperCase() + data.status?.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left side - Doctor Image and quick info */}
              <div className="md:w-1/3">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={data.doctor_image || "/default-avatar.png"}
                      alt={data.user_Id?.name}
                      className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 right-4 bg-white rounded-full p-1 shadow-md">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          data.available ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-gray-800 text-center">
                    {data.user_Id?.name || "No Name Provided"}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    {data.specialization}
                  </p>

                  <div className="mt-4 w-full bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Experience</span>
                      <span className="font-semibold">
                        {data.experience} years
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Consultation Fee</span>
                      <span className="font-semibold">₹{data.fees}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Available</span>
                      <span
                        className={`font-semibold ${
                          data.available ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {data.available ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Detailed Doctor Info */}
              <div className="md:w-2/3">
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    About
                  </h4>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {data.about || "No information provided."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">
                      Personal Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-gray-800">
                          {data.user_Id?.email || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-gray-800">
                          {data.user_Id?.phone || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Date of Birth</p>
                        <p className="text-gray-800">
                          {data.user_Id?.dob
                            ? new Date(data.user_Id.dob).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Gender</p>
                        <p className="text-gray-800">{data.gender || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">
                      Professional Details
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-gray-800">
                          {data.location || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Specialization</p>
                        <p className="text-gray-800">
                          {data.specialization || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">
                          Available Timings
                        </p>
                        <p className="text-gray-800">
                          {data.timings?.length
                            ? data.timings.join(", ")
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-gray-50 border-t gap-4">
            <div className="text-sm text-gray-500">
              Submitted on {new Date().toLocaleDateString()}
            </div>

            {data.status != "approved" && (
              <div className="flex space-x-3">
                <button
                  onClick={handleReject}
                  disabled={actionLoading || data.status !== "pending"}
                  className={`px-5 py-2 rounded-lg font cursor-pointer ${
                    actionLoading || data.status !== "pending"
                      ? "bg-gray-300 cursor-not-allowed   "
                      : "bg-red-500 hover:bg-red-700 text-white"
                  }`}
                >
                  {actionLoading ? "Processing..." : "Reject"}
                </button>
                <button
                  onClick={handleApprove}
                  disabled={actionLoading || data.status !== "pending"}
                  className={`px-5 py-2 rounded-lg font cursor-pointer ${
                    actionLoading || data.status !== "pending"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {actionLoading ? "Processing..." : "Approve"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

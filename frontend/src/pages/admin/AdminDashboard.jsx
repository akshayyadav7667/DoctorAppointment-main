import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

// Main Admin Dashboard Component
export default function AdminDashboard() {
  const { backendUrl, userToken } = useContext(AuthContext);

  const [dashboardData, setDashboardData] = useState(null);
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorDialogOpen, setDoctorDialogOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    fetchPendingDoctors();
    fetchAppointments();
    fetchUsers(1, 10, "");
  }, []);

  // API service functions
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      // console.log("Dashboard", response.data);

      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const fetchPendingDoctors = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/admin/allAppovalDoctor`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      // console.log("Approval Doctor", response.data);

      setPendingDoctors(response.data.doctors || []);
    } catch (error) {
      console.error("Error fetching pending doctors:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/admin/all-appointments`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log("Appointmet", response.data.appointment);

      setAppointments(response.data.appointment || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchUsers = async (page, limit, search) => {
    try {
      const params = new URLSearchParams({ page, limit, search }).toString();
      const response = await axios.get(
        `${backendUrl}/api/admin/getAllUser?${params}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // const changeDoctorStatus = async (doctorId, status) => {
  //   try {
  //     const response = await axios.post(
  //       `${backendUrl}/api/admin/changeDoctorStatus`,
  //       { doctorId, status },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${userToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log("Doctor Status", response.data);

  //     fetchPendingDoctors();
  //     fetchDashboardData();
  //     setDoctorDialogOpen(false);
  //   } catch (error) {
  //     console.error("Error changing doctor status:", error);
  //   }
  // };

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Data for charts
  const doctorStatusData = [
    { name: "Approved", value: dashboardData.approvedDoctor || 0 },
    { name: "Pending", value: dashboardData.pendingDoctors || 0 },
    { name: "Rejected", value: dashboardData.rejectedDoctor || 0 },
  ];

  const appointmentStatusData = [
    { name: "Confirmed", value: dashboardData.confirmedAppointment || 0 },
    { name: "Pending", value: dashboardData.pendingAppointment || 0 },
    { name: "Rejected", value: dashboardData.rejectedAppointment || 0 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      confirmed: "bg-green-100 text-green-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg  bg-gradient-to-tr from-blue-500 to-indigo-400 shadow p-6">
          <p className="text-white  text-sm">Total Users</p>
          <p className="text-2xl text-white font-bold">
            {dashboardData.user || 0}
          </p>
        </div>
        <div className="bg-white bg-gradient-to-tr from-orange-500 to-pink-300 rounded-lg shadow p-6">
          <p className="text-white text-sm">Total Doctors</p>
          <p className="text-2xl text-white font-bold">
            {dashboardData.totalDoctors || 0}
          </p>
        </div>
        <div className="bg-white bg-gradient-to-tr from-green-500 to-green-300 rounded-lg shadow p-6">
          <p className="text-white text-sm">Pending Approvals</p>
          <p className="text-2xl text-white font-bold">
            {dashboardData.pendingDoctors || 0}
          </p>
        </div>
        <div className="bg-white bg-gradient-to-tr from-yellow-500 to-yellow-300  rounded-lg shadow p-6">
          <p className="text-white  text-sm">Total Appointments</p>
          <p className="text-2xl text-white font-bold">
            {(dashboardData.pendingAppointment || 0) +
              (dashboardData.confirmedAppointment || 0) +
              (dashboardData.rejectedAppointment || 0)}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Doctor Status Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Doctor Status Distribution
          </h2>
          <div className="h-64">
            <div className="grid grid-cols-3 gap-4">
              {doctorStatusData.map((item, index) => (
                <div key={index} className="text-center">
                  <div
                    className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                    style={{ backgroundColor: COLORS[index] }}
                  >
                    <span className="text-white font-bold">{item.value}</span>
                  </div>
                  <p className="mt-2 text-sm">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appointment Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Appointment Status</h2>
          <div className="h-64">
            <div className="space-y-4">
              {appointmentStatusData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{item.name}</span>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${
                          (item.value /
                            (dashboardData.pendingAppointment +
                              dashboardData.confirmedAppointment +
                              dashboardData.rejectedAppointment)) *
                          100
                        }%`,
                        backgroundColor: COLORS[index],
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pending Doctor Approvals */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Pending Doctor Approvals</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingDoctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {doctor.user_Id?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {doctor.specialization}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {doctor.experience} years
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={doctor.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setDoctorDialogOpen(true);
                      }}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Appointments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.slice(0, 5).map((appointment) => (
                <tr key={appointment._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appointment.user_Id?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appointment.doctor_Id?.user_Id?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(appointment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={appointment.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doctor Review Dialog */}
      {doctorDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">
                Review Doctor Application
              </h2>
            </div>
            <div className="p-6">
              {selectedDoctor && (
                <div className="space-y-4">
                  <div>
                    <strong>Name:</strong> {selectedDoctor.user_Id?.name}
                  </div>
                  <div>
                    <strong>Specialization:</strong>{" "}
                    {selectedDoctor.specialization}
                  </div>
                  <div>
                    <strong>Experience:</strong> {selectedDoctor.experience}{" "}
                    years
                  </div>
                  <div>
                    <strong>About:</strong> {selectedDoctor.about}
                  </div>
                  <div>
                    <strong>Fees:</strong> ${selectedDoctor.fees}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() =>
                  changeDoctorStatus(selectedDoctor._id, "rejected")
                }
              >
                Reject
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() =>
                  changeDoctorStatus(selectedDoctor._id, "approved")
                }
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

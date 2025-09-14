import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import demo from "../../assets/upload_area.png";

export default function GetAllPatients() {
  const { backendUrl, userToken } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [totalUser, setTotalUser] = useState(0);

  const fetchAllUser = async (pageNumber = 1, searchQuery = "") => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${backendUrl}/api/admin/getAllUser?page=${pageNumber}&limit=10&search=${encodeURIComponent(
          searchQuery
        )}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.data.success) {
        setUsers(response.data.users);
        setPage(response.data.page);
        setTotalPages(response.data.totalPages);
        setTotalUser(response.data.totalUsers);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Add a delay before executing search to avoid too many API calls
    const delayDebounceFn = setTimeout(() => {
      setPage(1); // Reset to first page when searching
      fetchAllUser(1, searchTerm);
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    fetchAllUser(page, searchTerm);
  }, [page]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Patient Management
      </h2>

      {/* Search and Stats Bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients by name, email or phone..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg">
          <span className="font-semibold">{totalUser}</span> patients found
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Patient Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg"
              >
                <div className="p-5">
                  <div className="flex items-start space-x-4">
                    <img
                      src={user.image || demo}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {user.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{user.email}</p>
                      <p className="text-gray-600 text-sm">{user.phone}</p>

                      <div className="flex items-center mt-3 space-x-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {user.gender}
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          {new Date(user.dob).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600 truncate">
                      {user.address}
                    </p>
                  </div>

                  <button
                    onClick={() => handleViewDetails(user)}
                    className="mt-4 w-full py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No results message */}
          {users.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No patients found
              </h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search query
              </p>
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-700 mb-4 sm:mb-0">
            Showing page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Patient Detail Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Patient Details
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                <img
                  src={selectedUser.image || demo}
                  alt={selectedUser.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-100"
                />

                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedUser.name}
                  </h2>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <p className="text-gray-600">{selectedUser.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Gender
                  </h4>
                  <p className="font-medium">{selectedUser.gender}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Date of Birth
                  </h4>
                  <p className="font-medium">
                    {new Date(selectedUser.dob).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Address
                  </h4>
                  <p className="font-medium">{selectedUser.address}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Member Since
                  </h4>
                  <p className="font-medium">
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Last Updated
                  </h4>
                  <p className="font-medium">
                    {new Date(selectedUser.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end p-4 border-t">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { specialityData } from "../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Doctors() {
  const { speciality } = useParams();
  const { user, backendUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  const [category, setCategory] = useState(speciality || "");
  const [filterDoctor, setFilterDoctor] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Detect base route according to user role
  const basePath =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "doctor"
      ? "/doctor"
      : user?.role === "user"
      ? "/user"
      : "";

  // API for fetching doctors with pagination and search
  const fetchAllDoctors = async (pageNumber = 1, search = "") => {
    setLoading(true);
    try {
      let url = `${backendUrl}/api/admin/all-doctors?page=${pageNumber}&limit=8`;

      // Add search query if provided
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }

      // Add speciality filter if selected - note: backend expects "speciality" param but searches "specialization" field
      if (category) {
        url += `&speciality=${encodeURIComponent(category)}`;
      }

      const response = await axios.get(url);

      console.log(response.data.doctors);

      if (response.data.success) {
        setFilterDoctor(response.data.doctors || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalDoctors(response.data.totalDoctors || 0);
        setPage(response.data.currentPage || 1);
      } else {
        throw new Error("API request failed");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setFilterDoctor([]);
      setTotalDoctors(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchAllDoctors(1, searchQuery);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      fetchAllDoctors(newPage, searchQuery);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Update category from URL
  useEffect(() => {
    setCategory(speciality || "");
  }, [speciality]);

  // Fetch doctors when category or search changes
  useEffect(() => {
    fetchAllDoctors(1, searchQuery);
  }, [category]);

  // Fetch doctors when page changes
  useEffect(() => {
    if (page > 1) {
      fetchAllDoctors(page, searchQuery);
    }
  }, [page]);

  const handleChangeSpeciality = (clickedSpeciality) => {
    if (category === clickedSpeciality) {
      setCategory("");
      setPage(1);
      navigate(`${basePath}/doctors`);
    } else {
      setCategory(clickedSpeciality);
      setPage(1);
      navigate(`${basePath}/doctors/${clickedSpeciality}`);
    }
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;

    const buttons = [];
    const maxVisibleButtons = 5;

    let startPage = Math.max(1, page - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        &larr; Previous
      </button>
    );

    // First page and ellipsis if needed
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-2 py-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded-md border transition-colors ${
            page === i
              ? "bg-blue-600 border-blue-600 text-white"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-2 py-2 text-gray-500">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next &rarr;
      </button>
    );

    return buttons;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Find Doctors
              </h2>
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </form>

              <div>
                <h3 className="font-semibold text-gray-700 mb-3">
                  Specialties
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleChangeSpeciality("")}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      category === ""
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All Specialties
                  </button>
                  {specialityData.map((item) => (
                    <button
                      key={item.speciality}
                      onClick={() => handleChangeSpeciality(item.speciality)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        category === item.speciality
                          ? "bg-blue-100 text-blue-700 border border-blue-300"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {item.speciality}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
                  {category ? `${category} Specialists` : "All Doctors"}
                  <span className="text-blue-600 ml-2">({totalDoctors})</span>
                </h1>
                <p className="text-sm text-gray-600">
                  Showing {filterDoctor.length} of {totalDoctors} doctors
                </p>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : filterDoctor.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    No doctors found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery
                      ? `No results found for "${searchQuery}"`
                      : category
                      ? `No ${category} specialists available at the moment`
                      : "No doctors available at the moment"}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        fetchAllDoctors(1, "");
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterDoctor.map((doctor) => (
                      <div
                        key={doctor._id}
                        className="bg-white border border-blue-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() =>
                          navigate(`${basePath}/doctor/${doctor._id}`)
                        }
                      >
                        <div className="relative  md:h-68 bg-blue-100 transition-transform hover:bg-blue-600 overflow-hidden">
                          <img
                            src={doctor.doctor_image}
                            alt={doctor.name}
                            className=" h-full object-cover w-[50%] md:w-[80%] mx-auto   transition-transform  hover:scale-105"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Doctor";
                            }}
                          />
                          <div
                            className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                              doctor.available
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {doctor.available ? "Available" : "Busy"}
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="flex justify-between">
                            <h3 className="font-semibold text-lg text-gray-800 mb-1">
                              {doctor.user_Id.name}
                            </h3>
                            <p className="text-blue-700   mb-2">
                              {doctor.specialization}
                            </p>
                          </div>

                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="text-yellow-700">
                              {doctor.experience} years experience
                            </span>
                          </div>

                          <div className="flex justify-between items-center mb-4">
                            <div className="text-sm text-gray-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 inline mr-1 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                              <span className="font-semibold text-green-600">
                                ₹{doctor.fees}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {doctor.gender == "Male" ? "Male" : "Female"}{" "}
                              Doctor
                            </div>
                          </div>

                          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
                            Book Appointment
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-sm text-gray-600">
                        Page {page} of {totalPages}
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {renderPaginationButtons()}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

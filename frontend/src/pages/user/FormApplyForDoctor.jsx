import React, { useContext, useState, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import header from "../../assets/header_img.png";
import demo from "../../assets/doc8.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBriefcaseMedical,
  FaMapMarkerAlt,
  FaMoneyBillAlt,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";

const SPECIALIZATIONS = [
  "Gynecologist",
  "General physician",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];
const GENDER_OPTIONS = ["Male", "Female", "Others"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const validateForm = (formData, file, step) => {
  const errors = {};
  if (step === 1) {
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.specialization)
      errors.specialization = "Specialization is required";
  }
  if (step === 2) {
    if (!formData.experience || formData.experience < 0)
      errors.experience = "Valid experience required";
    if (!formData.fees || formData.fees <= 0)
      errors.fees = "Valid fee required";
    if (!formData.location.trim()) errors.location = "Location required";
    if (!file) errors.image = "Profile image is required";
  }
  if (step === 3) {
    if (!formData.about.trim() || formData.about.length < 50)
      errors.about = "About must be at least 50 characters";
  }
  return errors;
};

export default function FormApplyForDoctor() {
  const { userToken, backendUrl } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: "",
    specialization: "",
    experience: "",
    fees: "",
    location: "",
    available: true,
    about: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(demo);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [imageError, setImageError] = useState("");

  const validateImage = useCallback((file) => {
    if (!file) return "Profile image is required";
    if (!ALLOWED_FILE_TYPES.includes(file.type)) return "Invalid image format";
    if (file.size > MAX_FILE_SIZE) return "Max size 5MB";
    return "";
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked, files } = e.target;
      setFormErrors((prev) => ({ ...prev, [name]: "" }));

      if (type === "checkbox")
        setFormData((prev) => ({ ...prev, [name]: checked }));
      else if (type === "file") {
        const file = files[0];
        setSelectedFile(file);
        const err = validateImage(file);
        setImageError(err);
        if (!err) {
          const reader = new FileReader();
          reader.onloadend = () => setImagePreview(reader.result);
          reader.readAsDataURL(file);
        } else setImagePreview(demo);
      } else setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [validateImage]
  );

  const handleNext = () => {
    const errors = validateForm(formData, selectedFile, step);
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      setImageError(errors.image || "");
      toast.error("Please fix errors before continuing");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    const errors = validateForm(formData, selectedFile, step);
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      setImageError(errors.image || "");
      return toast.error("Please fix errors");
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => v && data.append(k, v));
      data.append("doctor_image", selectedFile);

      const res = await axios.post(`${backendUrl}/api/user/applyDoctor`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message || "Application submitted!");
      setHasApplied(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasApplied)
    return (
      <>
        <div className=" w-[80%] md:w-[60%] mx-auto flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-50 p-10 m-8">
          <FaCheckCircle className="text-green-500 text-6xl mb-4" />
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            Application Submitted!
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            Your application is under review. You will receive an email within
            2–3 business days.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Go Home
          </button>
        </div>

        <div className="mt-12 max-w-6xl mx-auto space-y-8 ">
          {/* Left Side - Benefits */}
          <div className="bg-blue-50 p-8 rounded-xl shadow-lg space-y-4 flex flex-col md:flex-row justify-between items-center ">
            <div className=" flex-1 ">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">
                Why Join Our Doctor Network?
              </h2>
              <ul className="space-y-3 text-gray-800 list-disc list-inside">
                <li>
                  Reach thousands of patients across your city and beyond.
                </li>
                <li>Manage appointments and consultations online, anytime.</li>
                <li>Increase your visibility with a verified profile badge.</li>
                <li>
                  Grow your practice and earn more without extra marketing.
                </li>
                <li>
                  Be part of a trusted, professional healthcare community.
                </li>
              </ul>
            </div>

            <div className=" flex-1  ">
              <img
                src={header}
                alt=""
                className="w-[60%] md:w-[90%] mx-auto bg-blue-500 md:bg-blue-600  rounded-full  p-1  border-1 md:border-0 border-blue-300"
              />
            </div>
          </div>

          {/* Right Side - How to Apply */}
          <div className="bg-orange-50 p-8 rounded-xl shadow-lg space-y-4">
            <h2 className="text-3xl font-bold text-orange-800 mb-4">
              How to Apply
            </h2>
            <ol className="space-y-3 text-gray-800 list-decimal list-inside">
              <li>
                Complete your profile accurately with all required details.
              </li>
              <li>Upload a professional photo that represents you.</li>
              <li>
                Provide a detailed “About” section with your experience and
                approach.
              </li>
              <li>
                Submit the application and wait for verification by our team.
              </li>
              <li>
                Once approved, start receiving patient appointments online.
              </li>
            </ol>
            <p className="mt-4 text-gray-700">
              <strong>Tip:</strong> Ensure all your information is accurate and
              complete for faster approval.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-4 bg-orange-600 text-white px-6 py-3 rounded-md shadow hover:bg-orange-700 transition"
            >
              Apply Now
            </button>
          </div>
        </div>
      </>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-10 to-blue-50 p-6">
      <div className="  p-4 w-2xl md:w-5xl  mx-auto ">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
          Apply as a Doctor
        </h1>

        <p className="text-center m-9 text-gray-600  mx-auto ">
          Join our platform as a doctor and connect with patients who need your
          expertise. Fill out the form below with your details, specialization,
          and experience. Once approved by our admin team, you’ll be able to
          manage appointments, consult with patients, and make a real difference
          in their lives.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="max-w-4xl mx-auto flex justify-between mb-8">
        {["Personal", "Professional", "About", "Confirm"].map(
          (label, index) => (
            <div key={index} className="flex-1 text-center">
              <div
                className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center ${
                  step > index
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>
              <p className="text-sm mt-1">{label}</p>
            </div>
          )
        )}
      </div>

      <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-50 to-skyblue-50 p-8 rounded-2xl shadow-xl space-y-8 transition-all">
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium flex items-center">
                Gender* <FaUser className="ml-2 text-gray-400" />
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {formErrors.gender && (
                <p className="text-red-500 mt-1">{formErrors.gender}</p>
              )}
            </div>
            <div>
              <label className="font-medium flex items-center">
                Specialization*{" "}
                <FaBriefcaseMedical className="ml-2 text-gray-400" />
              </label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Specialization</option>
                {SPECIALIZATIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {formErrors.specialization && (
                <p className="text-red-500 mt-1">{formErrors.specialization}</p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-medium flex items-center">
                  Experience (Years)*{" "}
                  <FaBriefcaseMedical className="ml-2 text-gray-400" />
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Years of experience"
                />
                {formErrors.experience && (
                  <p className="text-red-500 mt-1">{formErrors.experience}</p>
                )}
              </div>
              <div>
                <label className="font-medium flex items-center">
                  Consultation Fee (₹)*{" "}
                  <FaMoneyBillAlt className="ml-2 text-gray-400" />
                </label>
                <input
                  type="number"
                  name="fees"
                  value={formData.fees}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Fee in ₹"
                />
                {formErrors.fees && (
                  <p className="text-red-500 mt-1">{formErrors.fees}</p>
                )}
              </div>
            </div>

            <div className="relative">
              <label className="font-medium flex items-center">
                Location* <FaMapMarkerAlt className="ml-2 text-gray-400" />
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="City or Clinic Location"
              />
              {formErrors.location && (
                <p className="text-red-500 mt-1">{formErrors.location}</p>
              )}
            </div>

            <div className="text-center">
              <label
                htmlFor="image-upload"
                className="cursor-pointer inline-block"
              >
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-36 h-36 rounded-full mx-auto mb-2 shadow-lg border-2 border-blue-200 hover:scale-105 transition-transform"
                />
                <div className="text-blue-600 font-medium">
                  Click to upload professional photo*
                </div>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
              />
              {imageError && <p className="text-red-500 mt-1">{imageError}</p>}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="font-medium flex items-center">
              About Yourself* <FaInfoCircle className="ml-2 text-gray-400" />
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
              rows="6"
              placeholder="Tell us about your medical background, expertise, and approach to patient care."
            ></textarea>
            <p
              className={`text-sm mt-1 ${
                formData.about.length < 50 ? "text-red-500" : "text-green-600"
              }`}
            >
              {formData.about.length} / 50 characters
            </p>
            {formErrors.about && (
              <p className="text-red-500 mt-1">{formErrors.about}</p>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-700">
              Confirm Your Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Gender:</strong> {formData.gender}
              </div>
              <div>
                <strong>Specialization:</strong> {formData.specialization}
              </div>
              <div>
                <strong>Experience:</strong> {formData.experience} Years
              </div>
              <div>
                <strong>Fee:</strong> ₹{formData.fees}
              </div>
              <div>
                <strong>Location:</strong> {formData.location}
              </div>
              <div>
                <strong>Available:</strong> {formData.available ? "Yes" : "No"}
              </div>
            </div>
            <div className="mt-4">
              <strong>About:</strong>
              <p className="mt-1 text-gray-700">{formData.about}</p>
            </div>
            <div className="mt-4 text-center">
              <img
                src={imagePreview}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto shadow-md"
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </div>

      <div className="mt-12 max-w-6xl mx-auto space-y-8 ">
        {/* Left Side - Benefits */}
        <div className="bg-blue-50 p-8 rounded-xl shadow-lg space-y-4 flex flex-col md:flex-row justify-between items-center ">
          <div className=" flex-1 ">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">
              Why Join Our Doctor Network?
            </h2>
            <ul className="space-y-3 text-gray-800 list-disc list-inside">
              <li>Reach thousands of patients across your city and beyond.</li>
              <li>Manage appointments and consultations online, anytime.</li>
              <li>Increase your visibility with a verified profile badge.</li>
              <li>Grow your practice and earn more without extra marketing.</li>
              <li>Be part of a trusted, professional healthcare community.</li>
            </ul>
          </div>

          <div className=" flex-1  ">
            <img
              src={header}
              alt=""
              className="w-[60%] md:w-[90%] mx-auto bg-blue-500 md:bg-blue-600  rounded-full  p-1  border-1 md:border-0 border-blue-300"
            />
          </div>
        </div>

        {/* Right Side - How to Apply */}
        <div className="bg-orange-50 p-8 rounded-xl shadow-lg space-y-4">
          <h2 className="text-3xl font-bold text-orange-800 mb-4">
            How to Apply
          </h2>
          <ol className="space-y-3 text-gray-800 list-decimal list-inside">
            <li>Complete your profile accurately with all required details.</li>
            <li>Upload a professional photo that represents you.</li>
            <li>
              Provide a detailed “About” section with your experience and
              approach.
            </li>
            <li>
              Submit the application and wait for verification by our team.
            </li>
            <li>Once approved, start receiving patient appointments online.</li>
          </ol>
          <p className="mt-4 text-gray-700">
            <strong>Tip:</strong> Ensure all your information is accurate and
            complete for faster approval.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-4 bg-orange-600 text-white px-6 py-3 rounded-md shadow hover:bg-orange-700 transition"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

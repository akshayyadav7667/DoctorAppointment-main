import "./App.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserDashboard from "./pages/user/UserDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
// import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import PublicLayout from "./layout/PublicLayout";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Blog from "./pages/Blog";
import HomePage from "./pages/HomePage";
import Doctors from "./pages/Doctors";
import SingleDoctor from "./pages/SingleDoctor";
// import Doctor from "../../backend/models/Doctor";
import AdminLayout from "./layout/AdminLayout";
import UserLayout from "./layout/UserLayout";
import UserAppointments from "./pages/user/UserAppointments";
import UserProfile from "./pages/user/UserProfile";
import MyDashboard from "./pages/user/MyDashboard";
import UserHome from "./pages/user/UserHome";
import DoctorLayout from "./layout/DoctorLayout";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorAppointment from "./pages/doctor/DoctorAppointment";
import DoctorBlogs from "./pages/doctor/DoctorBlogs";
import AdminAddDoctor from "./pages/admin/AdminAddDoctor";
import AdminAppointment from "./pages/admin/AdminAppointment";
import ApplyForDoctor from "./pages/ApplyForDoctor";
import FormApplyForDoctor from "./pages/user/FormApplyForDoctor";
import ChartUser from "./pages/user/ChartUser";
// import AddDoctorAdmin from "./layout/AddDoctorAdmin";
function App() {
  // const { user } = useContext(AuthContext);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* public Routes */}

        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/doctor/:docId" element={<SingleDoctor />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* User Routes */}
        <Route
          path="/user/*"
          element={
            <ProtectedRoute role="user">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserHome />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="doctors/:speciality" element={<Doctors />} />
          <Route path="doctor/:docId" element={<SingleDoctor />} />
          <Route path="appointments" element={<UserAppointments />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="myDashboard" element={<MyDashboard />} />
          <Route path="applyDoctor" element={<FormApplyForDoctor/>} />
          <Route path="chat" element={<ChartUser/>} />
        </Route>

        {/* Doctor Routes */}
        <Route
          path="/doctor/*"
          element={
            <ProtectedRoute role="doctor">
              <DoctorLayout />
            </ProtectedRoute>
          }
        >
          <Route path="myDashboard" element={<DoctorDashboard />} />
          <Route path="profile" element={<DoctorProfile />} />
          <Route path="appointments" element={<DoctorAppointment />} />
          <Route path="blogs" element={<DoctorBlogs />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          
          <Route path="add-doctors" element={<AdminAddDoctor />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="appointments" element={<AdminAppointment/>} />
        </Route>

        {/* <Route index element={<AdminDashboard />} /> */}
      </Routes>
    </>
  );
}

export default App;

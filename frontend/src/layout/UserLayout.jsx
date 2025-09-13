import React from "react";
import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import NavbarUser from "../pages/user/NavbarUser";
import FooterUser from "../pages/user/FooterUser";

export default function UserLayout() {
  return (
    <>
      <NavbarUser />
      {/* Main content */}
      <main className=" bg-gray-50 overflow-auto">
        <Outlet />
      </main>

      <FooterUser />
    </>
  );
}

import React from "react";
import NavbarDoctor from "../pages/doctor/NavbarDoctor";
import FooterDoctor from "../pages/doctor/FooterDoctor";
import { Outlet } from "react-router-dom";

export default function DoctorLayout() {
  return (
    <>
      <NavbarDoctor />
      {/* Main content */}
      <main className=" bg-gray-50 overflow-auto">
        <Outlet />
      </main>

      <FooterDoctor />
    </>
  );
}

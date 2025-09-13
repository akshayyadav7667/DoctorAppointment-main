import React from 'react'
import { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";


export default function NavbarAdmin() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
      const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
    
      const navItems = [
        { to: "/admin", label: "Home" },
        // { to: "/admin/about", label: "About" },
        { to: "/admin/Dashboard", label: "Dashboard" },
        { to: "/admin/add-doctors", label: "Add Doctor" },
        { to: "/admin/user", label: "users" },
        { to: "/admin/appointments", label: "Appointments" },
        { to: "/admin/contact", label: "Contact" },
        { to: "/admin/blogs", label: "Blogs" },
    ];



  return (
     <div>
      <nav className="flex justify-between items-center p-6 relative ">
        <div className="text-2xl">
          <span className="text-4xl">⚕️</span>
          <span className="text-blue-700 text-3xl font-bold">MedConnect</span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex gap-8">
            {navItems.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 border-b-2 border-blue-700 pb-1"
                      : "hover:text-blue-700 hover:border-b-2 hover:border-blue-700 pb-1"
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <button className="relative px-4 cursor-pointer ">
              <IoChatbubbleEllipsesOutline className="w-8 h-8 text-green-700" />
              <span
                className="absolute top-1 right-5 transform translate-x-1/2 -translate-y-1/2 
                   bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center 
                   justify-center font-bold"
              >
                1
              </span>
            </button>
          </ul>
        </div>

        {/* Mobile view  */}

        <button className="lg:hidden z-50 cursor-pointer" onClick={toggleMenu}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {isMenuOpen && (
          <div
            className={`fixed top-0 right-0 h-full w-[40%] bg-blue-200 transform transition-transform duration-300 ease-in-out z-40
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <ul className="flex flex-col items-center space-y-6 mt-20   ">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-700 border-b-2 border-blue-700 pb-1"
                        : "hover:text-blue-700 hover:border-b-2 hover:border-blue-700 pb-1"
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </div>
  )
}

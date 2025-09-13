import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/doctors", label: "Doctors" },
    { to: "/features", label: "Features" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
    { to: "/blogs", label: "Blogs" },
  ];

  return (
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
        </ul>

        <Link
          to="/login"
          className="bg-blue-500 px-5 py-2 rounded  text-white hover:bg-blue-600 cursor-pointer transition duration-300"
        >
          Login
        </Link>
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
  );
}

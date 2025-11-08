import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-5 left-4 z-50 bg-sky-500 text-white p-2 rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={20} />}
      </button>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-20 left-0 h-[calc(100vh-80px)] w-64 bg-zinc-50 shadow-md py-6 px-4 flex flex-col transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        <nav className="flex flex-col gap-3 text-gray-600 text-base">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg font-medium transition flex items-center ${
                isActive ? "text-white bg-sky-500" : "hover:text-sky-500"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <img
              src="https://img.icons8.com/?size=100&id=S5D5w5vFLhYp&format=png&color=000000"
              className="w-6"
              alt="Dashboard"
            />
            <span className="ml-3">Dashboard</span>
          </NavLink>

          <NavLink
            to={"/all-appointment"}
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg font-medium transition flex items-center ${
                isActive ? "text-white bg-sky-500" : "hover:text-sky-500"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <img
              src="https://img.icons8.com/?size=100&id=QTADNrdh5I0o&format=png&color=000000"
              className="w-6"
              alt="Appointments"
            />
            <span className="ml-3">Appointments</span>
          </NavLink>

          <NavLink
            to={"/add-doctor"}
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg font-medium transition flex items-center ${
                isActive ? "text-white bg-sky-500" : "hover:text-sky-500"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <img
              src="https://img.icons8.com/?size=100&id=CMoTVZV8TzBH&format=png&color=000000"
              className="w-6"
              alt="Add Doctor"
            />
            <span className="ml-3">Add Doctor</span>
          </NavLink>

          <NavLink
            to={"/doctor-list"}
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg font-medium transition flex items-center ${
                isActive ? "text-white bg-sky-500" : "hover:text-sky-500"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <img
              src="https://img.icons8.com/?size=100&id=InPEs3rVsarN&format=png&color=000000"
              className="w-6"
              alt="Doctor List"
            />
            <span className="ml-3">Doctor List</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

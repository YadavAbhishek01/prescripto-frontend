import React from "react";
import Navbar from "../Componets/Header/Navbar";
import Footer from "../Componets/Footer/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "../Admin/Componets/Sidebar/Sidebar";

const Main = () => {
  const admin = JSON.parse(localStorage.getItem("role"));

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Navbar fixed at top */}
      <Navbar />

      <div className="flex flex-1 w-full">
        {/* Sidebar only if admin */}
        {admin === "Admin" && <Sidebar />}

        {/* Main content */}
        <main
          className={`flex-1 px-4 sm:px-6 py-6 overflow-y-auto mt-20 transition-all duration-300 
          ${admin === "Admin" ? "md:ml-64" : ""}`}
        >
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Main;

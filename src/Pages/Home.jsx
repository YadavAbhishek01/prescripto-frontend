import React from "react";
import Hero from "../Componets/Hero/Hero";

import Specialist from "../Componets/SpecialistCatagary/Specialist";
import Doctor from "../Componets/Doctors/Doctor";
import MiddelHero from "../Componets/MiddelHero/MiddelHero";
import Sidebar from "../Admin/Componets/Sidebar/Sidebar";
import DoctorList from "../Admin/pages/DoctorList";
import Dashboard from "../Admin/Componets/Hero/Hero";


const Home = () => {
  const admin =localStorage.getItem("role");

  return (
    <div className="min-h-screen bg-Zinc-400 ">
      
      {admin === "Admin" ? (
        <div className="flex">
          <main className="flex-1 p-6 bg-white">
            <Dashboard/>
          </main>
        </div>
      ) : (
        <div className="flex flex-col">
          <Hero/>
          <Specialist />
          <Doctor />
          <MiddelHero />
        </div>
      )}
    </div>
  );
};

export default Home;

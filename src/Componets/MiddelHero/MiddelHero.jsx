import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const MiddelHero = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("role"));
    setRole(user);
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 px-4">
        
        {/* Left Side: Text */}
        <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            Quality Healthcare <br />
            <span className="text-sky-600">You Can Trust</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-lg">
            Find the best doctors in your city, book appointments quickly, and take care of your health with confidence.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
            {role ? (
              <NavLink to="/all-doctor">
                <button className="bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-sky-700 transition">
                  Find a Doctor
                </button>
              </NavLink>
            ) : (
              <NavLink to="/signup">
                <button className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition">
                  Create Account
                </button>
              </NavLink>
            )}
            <NavLink to="/contact">
              <button className="border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition">
                Contact Us
              </button>
            </NavLink>
          </div>
        </div>

        {/* Right Side: Illustration */}
        <div className="flex-1 flex justify-center lg:justify-end relative">
          <div className="bg-gray-100 rounded-2xl shadow-lg p-6 max-w-sm">
            <img
              src="https://prescripto.vercel.app/assets/appointment_img-DzbZlMsi.png"
              alt="Doctor Illustration"
              className="w-full object-contain rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Optional Feature Highlights */}
      <div className="container mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        <div className="bg-sky-50 p-6 rounded-xl text-center shadow-sm">
          <h3 className="font-bold text-lg text-sky-600">Trusted Doctors</h3>
          <p className="text-gray-600 mt-2">Work with certified specialists you can rely on.</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl text-center shadow-sm">
          <h3 className="font-bold text-lg text-green-600">Easy Appointments</h3>
          <p className="text-gray-600 mt-2">Book consultations with a few clicks.</p>
        </div>
        <div className="bg-orange-50 p-6 rounded-xl text-center shadow-sm">
          <h3 className="font-bold text-lg text-orange-600">24/7 Support</h3>
          <p className="text-gray-600 mt-2">Get help whenever you need it.</p>
        </div>
      </div>
    </section>
  );
};

export default MiddelHero;

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { message } from 'antd';

const Hero = () => {
  const navigate = useNavigate();
  const [roleData, setRoleData] = useState(null);

  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("role"));
    setRoleData(role);
  }, []);

  const handleAppointment = () => {
    if (roleData) {
      navigate('/all-doctor');
    } else {
      message.error("Please login to get Appointment");
      navigate('/');
    }
  };

  return (
    <section className="relative bg-gray-50 min-h-screen flex items-center">
      {/* Background overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://plus.unsplash.com/premium_photo-1681966826227-d008a1cfe9c7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600" 
          alt="Background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative  flex flex-col-reverse md:flex-row items-center gap-12">
        
        {/* Left Section */}
        <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Your Health, <span className="text-sky-600">Our Priority</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-base max-w-lg mx-auto md:mx-0">
            Browse through certified doctors, schedule appointments instantly, and get trusted medical care from home.
          </p>

          {/* Info Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-2xl transition-transform transform hover:-translate-y-2">
              <img src="https://img.icons8.com/ios-filled/50/000000/stethoscope.png" alt="Doctors" className="mb-3"/>
              <h3 className="font-semibold text-gray-800 text-lg">Expert Doctors</h3>
              <p className="text-gray-500 text-sm text-center">Connect with verified specialists in all major fields.</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-2xl transition-transform transform hover:-translate-y-2">
              <img src="https://img.icons8.com/ios-filled/50/000000/calendar.png" alt="Appointments" className="mb-3"/>
              <h3 className="font-semibold text-gray-800 text-lg">Easy Booking</h3>
              <p className="text-gray-500 text-sm text-center">Schedule appointments online in a few clicks.</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-2xl transition-transform transform hover:-translate-y-2">
              <img src="https://img.icons8.com/ios-filled/50/000000/heart-with-pulse.png" alt="Care" className="mb-3"/>
              <h3 className="font-semibold text-gray-800 text-lg">24/7 Care</h3>
              <p className="text-gray-500 text-sm text-center">Get timely medical attention whenever you need it.</p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleAppointment}
            className="mt-8 w-52 md:w-48 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition transform hover:-translate-y-1"
          >
            Book Appointment
          </button>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src="https://img.icons8.com/pulsar-gradient/480/hospital.png"
            alt="Doctor Illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

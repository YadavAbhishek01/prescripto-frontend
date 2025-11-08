import React, { useContext, useEffect, useState } from 'react';
import DoctorContext from "../../contextApi/DoctorContext";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
// import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import { message } from 'antd';

const Doctor = () => {
  const { backendUrl, admintoken } = useContext(DoctorContext);
  const [isLoader, setLoader] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const handleViewAll = () => {
    setLoader(true);
    setTimeout(() => {
      navigate('/all-doctor');
    }, 1000);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axiosInstance.get('/public/doctors');
        if (data.success) {
          setDoctors(data.doctors);
        } else {
          message.error(data.message, "Fetching Error");
        }
      } catch (error) {
        console.error(error);
        message.error("Unable to fetch doctors.");
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="px-6 md:px-20 py-12 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gradient bg-clip-text text-transparent bg-sky-500">
          Top Doctors to Book
        </h1>
        <p className="text-gray-600 mt-3 text-sm md:text-base">
          Browse our trusted doctors and schedule your appointment hassle-free.
        </p>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {doctors.length === 0 && <p className="col-span-full text-center text-gray-500">No doctors available</p>}

        {doctors.slice(0, 8).map((doctor, idx) => (
          <div
            key={idx}
            className="bg-white w-68 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer overflow-hidden"
            onClick={() => navigate('/all-doctor')}
          >
            <div className="relative">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-50 object-cover"
              />
              {/* Availability Badge */}
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                  doctor.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {doctor.available ? "Available" : "Not Available"}
              </span>
            </div>

            <div className="p-5 text-center">
              <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
              <p className="text-indigo-600 font-medium mt-1">{doctor.speciality}</p>
              <p className="text-gray-500 text-sm mt-1">{doctor.experience}</p>
              <p className="text-gray-700 font-semibold mt-2">
                ${doctor.fees} <span className="text-sm text-gray-400">/appointment</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-12">
        <button
          className="bg-sky-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 flex items-center gap-2"
          onClick={handleViewAll}
        >
          {isLoader ? <ClipLoader color="#fff" size={20} />  : "View All Doctors"}
        </button>
      </div>
    </div>
  );
};

export default Doctor;

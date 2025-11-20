import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import GlobalLoader from "../Componets/Loader/GlobalLoader";

const AllDoctorDetails = () => {
  const [doctordata, setDoctorData] = useState([]);
  const [specialty, setSpecialty] = useState("");
  const navigator = useNavigate();

  const filteredData = useMemo(() => {
    if (!specialty) return doctordata;
    return doctordata.filter((doc) => doc.speciality === specialty);
  }, [doctordata, specialty]);

  useEffect(() => {
    const fetchdoctor = async () => {
      try {
        const { data } = await axiosInstance.get("/public/doctors");

        if (data.success) {
          const docdata = data.doctors;
          setDoctorData(docdata);
        } else {
          message.error(data.message, "fetching error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchdoctor();
  }, []);

  const uniqueSpecialties = [
    ...new Set(doctordata.map((doc) => doc.speciality)),
  ];

  return (
    <div className="container mx-auto px-3 sm:px-4 py-10 mt-14 max-w-7xl">

      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          Browse through doctor specialists
        </h1>

        <select
          name="specialist"
          id="specialist"
          className="px-4 py-2 border border-gray-300 rounded-xl bg-white shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-sky-500 
                     focus:border-sky-500 transition w-full sm:w-64"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">All Specialists</option>
          {uniqueSpecialties.map((spec, i) => (
            <option key={i} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {/* Doctors or Error */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-6">
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all 
                         duration-300 overflow-hidden cursor-pointer border border-gray-100 w-full"
              onClick={() => {
                navigator(`/appoinment/${item._id}`);
              }}
            >
              <div className="flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-44 sm:h-48 md:h-56 lg:h-64 object-cover rounded-t-2xl bg-gray-100"
                />
              </div>

              <div className="p-4 sm:p-5 text-center space-y-1 sm:space-y-2">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {item.name}
                </h2>

                <p className="text-sm sm:text-base text-sky-600 font-medium">
                  {item.speciality}
                </p>

                <p className="text-gray-500 text-sm sm:text-base">
                  {item.experience}
                </p>

                <p className="text-gray-900 font-bold mt-1 text-base">
                  ${item.fees}{" "}
                  <span className="text-sm text-gray-500">/ appointment</span>
                </p>

                <span
                  className={`mt-2 sm:mt-3 inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                    item.available
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-rose-100 text-rose-600"
                  }`}
                >
                  {item.available ? "Available" : "Not Available"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full mt-10 text-center px-4 col-span-full">
            <img
              src="https://img.icons8.com/external-flat-icons-vectorslab/680/external-Server-Error-network-and-communication-flat-icons-vectorslab.png"
              alt="error"
              className="w-48 sm:w-64 md:w-72 mx-auto"
            />

            <p className="text-red-600 font-semibold text-lg mt-4">
              Server Error — Please Try Again Later!
            </p>

            <button
              className="bg-sky-500 text-white py-2 px-6 rounded-lg mt-4 w-full sm:w-auto"
              onClick={() => navigator("/")}
            >
              Go To Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDoctorDetails;

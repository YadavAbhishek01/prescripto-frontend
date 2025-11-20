import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";


const AllDoctorDetails = () => {
  const [ doctordata,setDoctorData ] = useState([]);

  const [specialty, setSpecialty] = useState("");
  const navigator = useNavigate();


  const filteredData = useMemo(() => {

    if (!specialty) return doctordata;
    return doctordata.filter((doc) => doc.speciality === specialty);
  }, [doctordata, specialty]);

 
  useEffect(() => {
                const fetchdoctor = async () => {
      try {
        const { data } = await axiosInstance.get('/public/doctors')

        if (data.success) {
       
          const docdata = data.doctors
          setDoctorData(docdata)
        }
        else {
          message.error(data.message, "fetching error")
        }
      }


      catch (error) {
        console.log(error)
     
      }
    }
    fetchdoctor()

  }, []);


  const uniqueSpecialties = [...new Set(doctordata.map((doc) => doc.speciality))];

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      {/* Header & Filter */}
      <div className="relative flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Browse through doctor specialists
        </h1>
        <select
          name="specialist"
          id="specialist"
          className="px-4  py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition w-64 md:w-60"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">All Specialists</option>
          {uniqueSpecialties.map((spec, i) => (
            <option key={i} value={spec} className="w-2xs">
              {spec}
            </option>
          ))}
        </select>
      </div>

      {/* Doctors or Error */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredData.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl w-[75%] shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer"
              onClick={() => {
                navigator(`/appoinment/${item._id}`);
              }}
            >
              <div className='flex items-center justify-center '>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 md:h-56 lg:h-60 object-cover rounded-t-2xl bg-gray-100"
              />
            </div>
              <div className="p-4 text-center ">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-sm text-indigo-600 font-medium">
                  {item.speciality}
                </p>
                <p className="text-gray-500 text-sm mt-1">{item.experience}</p>
                <p className="text-gray-700 font-semibold mt-2">
                  ${item.fees}{" "}
                  <span className="text-sm text-gray-500">/ appointment</span>
                </p>
                <span
                  className={`mt-3 inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    item.available
                      ? "bg-green-100 text-green-500"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {item.available ? "Available" : "Not Available"}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllDoctorDetails;

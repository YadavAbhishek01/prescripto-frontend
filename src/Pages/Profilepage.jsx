import React, { useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Image, message } from 'antd';
import axiosInstance from '../utils/axiosInstance';
const Profilepage = () => {
  const navigate = useNavigate();
  const [profiledata, setProfileData] = useState([]);



useEffect(() => {
  const usertoken = localStorage.getItem('token');

  const fetchuser = async () => {
    try {
      const res = await axiosInstance.get('/user/getuser', {
        headers: {
          Authorization: `Bearer ${usertoken}`, // ✅ must include 'Bearer'
        },
      });

      setProfileData(res.data.user)
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  if (usertoken) fetchuser();
  else console.warn("No token found in localStorage");
}, []);






  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white w-full md:w-3/5 rounded-xl shadow-lg p-6 flex flex-col gap-6">
       
        <div className="p-4 rounded-lg shadow-sm border border-gray-200">
         
          <div className="flex items-center justify-between mb-4">
            {profiledata.image ? (
              <div className="flex items-center gap-4">
                <Image
                  width={100}
                  height={100}
                  src={profiledata.image}
                  alt=""
                  className="rounded-full object-cover border border-gray-300"
                />
             
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <FaRegUser className="text-7xl text-gray-400 border border-gray-300 rounded-full p-4" />
                <p className="text-gray-500 italic">No profile image</p>
              </div>
            )}
          </div>

          {/* User Details */}
          <h1 className="text-2xl font-bold text-gray-800 capitalize">{profiledata.name}</h1>
          <p className="text-gray-500">{profiledata.email}</p>

          {/* Address & Phone */}
          <div className="mt-3 text-gray-600 flex flex-col gap-2">
            <p className="capitalize flex items-center">
              <FaLocationDot className="text-red-500 text-xl mr-2" />
              {profiledata.address || "Not provided"}
            </p>
            <div className="flex items-center">
              <FaPhoneAlt className="text-xl mr-2" />
              {profiledata.phone_number?.length === 10 && <span>+91-</span>}
              <p>{profiledata.phone_number || "Not provided"}</p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="mt-4 border-t border-gray-200 pt-3 flex flex-col md:flex-row gap-6">
            <div>
              <p className="text-gray-500 font-semibold">Basic Information</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 text-gray-700">
              <p>Gender: {profiledata.gender || "N/A"}</p>
              <p>Birthday: {profiledata.dob || "N/A"}</p>
            </div>
          </div>

          {/* Edit Button */}
          <div className="mt-5">
            <button
              className="flex items-center bg-sky-500 px-6 py-2 rounded-full text-white font-semibold hover:bg-sky-600 transition"
              onClick={() => navigate(`/edit-profile/${profiledata._id}`)}
            >
              Edit Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;

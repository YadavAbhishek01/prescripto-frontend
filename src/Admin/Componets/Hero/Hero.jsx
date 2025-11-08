import React, { useContext, useEffect, useState } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { FcBusinessman, FcAdvertising } from "react-icons/fc";
import DoctorContext from "../../../contextApi/DoctorContext";
import {message} from 'antd'
import { MoonLoader } from "react-spinners";
import axiosInstance from "../../../utils/axiosInstance";
// import '../Hero/hero.css'
const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
     const { backendUrl, admintoken } = useContext(DoctorContext);
  const[activedoc,setActiveDoc]=useState([])


  useEffect(()=>{
            const fetchdata=async(req,res)=>{
              try{
        
                  const {data}=await axiosInstance.get('/admin/all-doctors',{headers :{admintoken}})

                if(data.success)
                {
                  
                    const docsdata=data.doctors
                    const filterdata=docsdata.filter((doc)=>doc.available)
                    setActiveDoc(filterdata)
                    
                
                }
                 else{
                        message.error(data.message || "Failed to fetch doctors")
                        }
              }
              catch(error)
              {
                console.log("Fetching Eroor",error)
                message.error("Server error while fetching doctors");
              }
                
            }
            const getappoint=async()=>{
                const res=await axiosInstance.get('/appointments/')
                console.log(res.data.appointments)
                setAppointments(res.data.appointments)
            }
             const alldata = appointments.filter((doc) => doc.isActive);
            fetchdata()
            getappoint()
  },[backendUrl,admintoken])
 

  return (
    <div className="w-full  bg-sky-200 px-6 py-6 hero">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {/* Active Doctors */}
        <div className="flex relative flex-col bg-white shadow-lg p-6 rounded-2xl hover:shadow-xl transition">
          <FaUserDoctor className="text-sky-500 text-6xl mb-3" />
          <h1 className="font-semibold text-lg text-gray-700">Active Doctors</h1>
          <p className="absolute top-6 right-6 text-3xl font-bold text-sky-700">
            {activedoc.length}
          </p>  
        </div>

        {/* Appointments */}
        <div className="flex relative flex-col bg-white shadow-lg p-6 rounded-2xl hover:shadow-xl transition">
          <FaBook className="text-amber-500 text-6xl mb-3" />
          <h1 className="font-semibold text-lg text-gray-700">Appointments</h1>
          <p className="absolute top-6 right-6 text-3xl font-bold text-amber-700">
            {appointments.length}
          </p>
        </div>

        {/* Patients */}
        <div className="flex relative flex-col bg-white shadow-lg p-6 rounded-2xl hover:shadow-xl transition">
          <FcBusinessman className="text-6xl mb-3" />
          <h1 className="font-semibold text-lg text-gray-700">Patients</h1>
          <p className="absolute top-6 right-6 text-3xl font-bold text-green-700">
          {appointments.length}
          </p>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="bg-white mt-10 shadow-md rounded-2xl overflow-hidden">
        <div className="heading border-b flex items-center justify-center gap-3 py-4 bg-zinc-50">
          <FcAdvertising className="text-3xl" />
          <h1 className="capitalize text-2xl font-semibold text-gray-600">
            Latest Bookings
          </h1>
        </div>

        {appointments.length > 0 ? (
          <div className="divide-y">
            {appointments.reverse().map((doc, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition"
              >
                <img
                  src={doc.image?doc.image :'https://img.icons8.com/color/48/tear-off-calendar--v1.png'}
                  alt={doc.name}
                  className="w-16 h-16 rounded-full border shadow-sm"
                />
                <div>
                  <p className="font-semibold text-gray-700">{doc.doctorname}</p>
                  <p className="text-sm text-gray-500">
                    Booking Date: <span className="font-medium">{doc.date? new Date(doc.date).toLocaleDateString():''}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
             <img src="https://img.icons8.com/?size=100&id=igRGF9zPpSqN&format=png&color=000000" alt="" className="w-8" />
               <p className="text-center text-gray-500 py-6">
            No bookings available.
          </p>
          </div>
        
        )}
      </div>
 
    </div>
  );
};

export default Dashboard;

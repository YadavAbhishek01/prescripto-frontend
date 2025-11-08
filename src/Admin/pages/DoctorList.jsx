import React, { useContext, useEffect, useState } from 'react'
import DoctorContext from '../../contextApi/DoctorContext'
import { Link, useNavigate } from 'react-router-dom'
import { message } from "antd";
import DraggableDialog from '../../Componets/DraggableDialog';
import axiosInstance from '../../utils/axiosInstance';
const DoctorList = () => {
  const { backendUrl, admintoken } = useContext(DoctorContext);
  const [doctorsData, setDoctorsData] = useState([])
  const [open, setOpen] = useState(false)
  const [docId, setDocId] = useState('')
  const navigate = useNavigate()

  // Redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem('admintoken')) {
      navigate('/login/:admin')
    }
  }, [navigate])

  // Fetch doctors
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/admin/all-doctors`,
          { headers: { admintoken } }
        )
        if (data.success) setDoctorsData(data.doctors)
        else message.error(data.message || "Failed to fetch doctors")
      } catch (error) {
        console.error("Error fetching doctors:", error)
        message.error("Server error while fetching doctors");
      }
    }
    getDoctors()
  }, [backendUrl, admintoken])

  const confirmDelete = async () => {
    try {
      const { data } = await axiosInstance.delete(
        `/admin/delete-doctor/${docId}`,
        { headers: { admintoken } }
      )
      if (data.success) {
        message.success(data.message)
        setDoctorsData(prev => prev.filter(doc => doc._id !== docId))
      } else message.error(data.message || "Failed to delete doctor")
    } catch (error) {
      console.error("Error deleting doctor:", error)
      message.error("Server error while deleting doctor")
    }
    setOpen(false)
  }

  const handleDelete = (id) => {
    setDocId(id)
    setOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Doctor List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctorsData && doctorsData.length > 0 ? (
          doctorsData.map((doctor, i) => (
            <div
              key={doctor._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-64">
                <img
                  src={doctor.image || "https://img.icons8.com/?size=100&id=51823&format=png&color=000000"}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                    doctor.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}
                >
                  {doctor.isActive ? "Available" : "Not Available"}
                </span>
              </div>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{doctor.name}</h2>
                  <p className="text-sm text-indigo-600 font-medium mt-1">{doctor.specialty}</p>
                  <p className="text-gray-500 text-sm mt-1">{doctor.experience}</p>
                  <p className="text-gray-700 font-semibold mt-2">
                    ${doctor.fees} <span className="text-sm text-gray-500">/ appointment</span>
                  </p>
                </div>

                {/* Actions */}
                <div className='flex items-center justify-center mt-4 gap-3'>
                  <Link to={`edit-doctordetails/${doctor._id}`}>
                    <button className='bg-sky-500 text-white py-1 px-5 rounded-2xl hover:bg-sky-400 transition'>
                      Edit
                    </button>
                  </Link>
                  <button
                    className='bg-red-600 text-white py-1 px-3 rounded-2xl hover:bg-red-700 transition'
                    onClick={() => handleDelete(doctor._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500">
            No doctors available
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <DraggableDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Confirmation"
        message="Are you sure you want to delete this doctor?"
        submitBtn={"Delete"}
      />
    </div>
  )
}

export default DoctorList

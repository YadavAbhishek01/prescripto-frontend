import React, { useEffect, useState } from 'react'
import DraggableDialog from '../Componets/DraggableDialog'
import { message } from 'antd'
import axiosInstance from '../utils/axiosInstance'

const MyAppoinments = () => {
  const [appoinmentdata, setAppoinmentData] = useState([])
  const [Loginuser, setLoginUser] = useState(null)
  const [userappointments, setUserAppointments] = useState([])
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState("")

  useEffect(() => {
    const loginuserdata =localStorage.getItem("Loginuser")
    setLoginUser(loginuserdata)
    getappointments()
  }, [])

  const getappointments = async () => {
    try {
      const res = await axiosInstance.get('/appointments/')
      if (res.data.success) {
        setAppoinmentData(res.data.appointments)
      } else {
        message.error("Failed to fetch appointments")
      }
    } catch (error) {
      console.error("Error fetching appointments:", error)
      message.error("Server error while fetching appointments")
    }
  }

  useEffect(() => {
    if (appoinmentdata.length > 0 && Loginuser) {
      const data = appoinmentdata.filter(
        (user) => user.Patient_details?.email === Loginuser
      )
      setUserAppointments(data)
    }
  }, [appoinmentdata, Loginuser])

  const DeleteAppointment = async () => {
    try {
      const res = await axiosInstance.delete(
        `/appointments/delete-appointment/${deleteId}`
      )
      if (res.data.success) {
        message.success(res.data.message)
        setAppoinmentData((prev) => prev.filter((doc) => doc._id !== deleteId))
        setOpen(false)
      } else {
        message.error(res.data.message || "Failed to delete appointment")
      }
    } catch (error) {
      console.error("Error deleting appointments:", error)
      message.error("Server error while deleting appointments")
    }
  }

  const hadlecancel = (id) => {
    setDeleteId(id)
    setOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">My Appointments</h2>

      {userappointments.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No appointments booked yet.</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userappointments.slice().reverse().map((doc, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl transition-shadow rounded-xl p-6 flex flex-col md:flex-row items-center gap-6"
          >
            <div className="flex-shrink-0">
              {doc.image ? (
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-indigo-300"
                />
              ) : (
                <img
                  src="https://img.icons8.com/?size=100&id=51823&format=png&color=000000"
                  alt="Doctor"
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-indigo-300"
                />
              )}
            </div>

            <div className="flex-1 text-gray-700 space-y-1 md:space-y-2">
              <p className="text-lg font-semibold text-gray-800">{doc.doctorname}</p>
              <p><span className="font-medium text-indigo-600">Specialty:</span> {doc.specialist}</p>
              <p><span className="font-medium text-indigo-600">Phone:</span> {doc.phone}</p>
              <p><span className="font-medium text-indigo-600">Date:</span> {doc.date ? new Date(doc.date).toLocaleDateString() : ''}</p>
              <p><span className="font-medium text-indigo-600">Time:</span> {doc.time}</p>

              <hr className="my-2 border-gray-300" />

              <p className="text-center font-semibold text-gray-600 mt-2">Patient Details</p>
              <p className='whitespace-nowrap  capitalize'><span className="font-medium text-indigo-600">Name:</span> {doc.Patient_details?.patientsname}</p>
              <p className=' capitalize'><span className="font-medium text-indigo-600">Gender:</span> {doc.Patient_details?.gender}</p>
            </div>

            <button
              onClick={() => hadlecancel(doc._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full mt-4 md:mt-0 shadow-md hover:shadow-lg transition-shadow"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>

      <DraggableDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={DeleteAppointment}
        title="Delete Confirmation"
        message="Are you sure you want to delete this appointment?"
        submitBtn={"OK"}
      />
    </div>
  )
}

export default MyAppoinments

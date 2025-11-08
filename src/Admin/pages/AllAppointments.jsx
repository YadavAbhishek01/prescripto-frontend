import React, { useEffect, useState } from "react";
import DraggableDialog from "../../Componets/DraggableDialog";
import { message } from "antd";
import axiosInstance from "../../utils/axiosInstance";
const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const res = await axiosInstance.get("/appointments/");
        const data = res.data.appointments || res.data || [];
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
      }
    };
    getAppointments();
  }, []);

  const deleteAppointment = async () => {
    if (!deleteId) return;
    try {
      const res = await axiosInstance.delete(
        `/appointments/delete-appointment/${deleteId}`
      );
      if (res.data.success) {
        message.success("Appointment deleted");
        setAppointments((prev) => prev.filter((a) => a._id !== deleteId));
      } else {
        message.error("Failed to delete appointment");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      message.error("Server error while deleting appointment");
    }
    setOpen(false);
    setDeleteId(null);
  };

  const handleCancel = (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        All Appointments
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-lg shadow-md">
        <div className="grid grid-cols-7 bg-gray-100 px-4 py-3 text-gray-600 font-semibold text-sm rounded-t-lg">
          <p>#</p>
          <p>Patient Name</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p className="text-center">Action</p>
        </div>

        {appointments.length > 0 ? (
          appointments.map((item, i) => (
            <div
              key={item._id}
              className="grid grid-cols-7 items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition border-b"
            >
              <p>{i + 1}</p>
              <p className="capitalize">{item.Patient_details?.patientsname || "-"}</p>
              <p>{item.Patient_details?.age || "-"}</p>
              <p>
                {item.date ? new Date(item.date).toLocaleDateString() : "-"}{" "}
                <span>{item.time || ""}</span>
              </p>
              <p>{item.doctorname || "-"}</p>
              <p className="text-green-600 font-semibold">${item.fees || "0"}</p>
              <div className="flex justify-center">
                <button
                  className="px-3 py-1 text-xs rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                  onClick={() => handleCancel(item._id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 text-gray-500">
            No appointments available
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {appointments.length > 0 ? (
          appointments.map((item, i) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md p-4 space-y-2 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-700">{item.Patient_details?.patientsname || "-"}</h2>
                <span className="text-sm text-gray-500">{item.date ? new Date(item.date).toLocaleDateString() : "-"} {item.time || ""}</span>
              </div>
              <p><span className="font-medium">Age:</span> {item.Patient_details?.age || "-"}</p>
              <p><span className="font-medium">Doctor:</span> {item.doctorname || "-"}</p>
              <p><span className="font-medium text-green-600">Fees:</span> ${item.fees || "0"}</p>
              <button
                className="w-full mt-2 bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200 transition"
                onClick={() => handleCancel(item._id)}
              >
                Cancel
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 text-gray-500">
            No appointments available
          </div>
        )}
      </div>

      {/* Delete Dialog */}
      <DraggableDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteAppointment}
        title="Delete Confirmation"
        message="Are you sure you want to delete this appointment?"
        submitBtn={"OK"}
      />
    </div>
  );
};

export default AllAppointments;

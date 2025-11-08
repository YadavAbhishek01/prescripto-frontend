import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Appoinment from "../Componets/Appoinments/Appoinment";
import axiosInstance from "../utils/axiosInstance";
const DoctorDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [doctorData, setDoctorData] = useState([]);



  useEffect(() => {

    const fetchdoctor = async () => {
      try {
        const { data } = await axiosInstance.get('/public/doctors')

        if (data.success) {

          const docdata = data.doctors

          const filterdata = docdata.filter((doc) => doc._id === id)
          setDoctorData(filterdata)
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

  const Appointmentsfess = doctorData.map((doc) => doc.appointmentFees);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Doctor Info */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-10 shadow-md">
          {doctorData.map((doc, i) => (
            <div
              key={i}
              className="flex flex-col lg:flex-row gap-6 lg:gap-10"
            >
              {/* Image */}
              <div className="flex justify-center lg:justify-start">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-md"
                />
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between gap-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {doc.name}
                  </h2>
                  <p className="text-indigo-600 font-semibold text-lg">
                    {doc.speciality}
                  </p>
                  <p className="text-gray-500 mt-1">
                    {doc.experience} Experience
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-inner">
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-gray-700 mb-2">{doc.about}</p>
                  <p className="text-gray-800 font-bold">
                    Appointment Fee:{" "}
                    <span className="text-indigo-600">
                      ${doc.fees}
                    </span>
                  </p>
                  <div className="flex items-center justify-between">
                    <p>Doctor:</p>
                    <p
                      className={`font-medium ${doc.available ? "text-green-500" : "text-red-500"
                        }`}
                    >
                      {doc.available ? "Available" : "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center lg:justify-start">
                  <button
                    onClick={() => navigate(-1)}
                    className="mt-4 w-full lg:w-auto bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-400 transition"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Appointment Form */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-10 shadow-md w-full">
          <Appoinment filderdata={doctorData} Fees={Appointmentsfess} />
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;

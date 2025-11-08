import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate, useParams } from "react-router-dom";
import { message, TimePicker } from "antd";
import dayjs from "dayjs";
import axiosInstance from "../../utils/axiosInstance";

const Appoinment = ({ filderdata, Fees }) => {
  const { id } = useParams();
  const navigator = useNavigate();

  // State
  const [value, setValue] = useState(new Date()); // Always a Date
  const [time, setTime] = useState(dayjs().format("h:mm A")); // 12-hour format
  const [slote, setSlote] = useState([]);
  const [doctordata, setDoctorData] = useState([]);
  const [currentdoctor, setCurrentdoctor] = useState(null);
  const [Patientsname, setPatientsName] = useState(null);

  // Fetch doctors
  useEffect(() => {
    const fetchdoctor = async () => {
      const res = await axiosInstance.get("/public/doctors");
      setDoctorData(res.data.doctors);
    };
    fetchdoctor();
  }, [filderdata]);

  // Find current doctor
  useEffect(() => {
    if (doctordata.length > 0) {
      const doctor = doctordata.find((doc) => doc._id === id);
      setCurrentdoctor(doctor);
    }
  }, [doctordata, id]);

  // Fetch patient
  useEffect(() => {
    const usertoken = localStorage.getItem("token");
    const fetchuser = async () => {
      try {
        const response = await axiosInstance.get("/user/getuser", {
          headers: { Authorization: `Bearer ${usertoken}` },
        });
        setPatientsName(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchuser();
  }, []);

  // Handle appointment booking
  const handelappoinment = async () => {
    const user = JSON.parse(localStorage.getItem("role"));
    if (!user) {
      window.alert("If you want to book an appointment, please login.");
      navigator("/login");
      return;
    }

    const calculateAge = (birthdate) => {
      if (!birthdate) return "-";
      const today = new Date();
      const dob = new Date(birthdate);
      let age = today.getFullYear() - dob.getFullYear();
      const monthdiff = today.getMonth() - dob.getMonth();
      if (monthdiff < 0 || (monthdiff === 0 && today.getDate() < dob.getDate())) age--;
      return age;
    };

    if (!time) {
      message.error("Please Select time to Get Appointment");
      return;
    }

    const appoinment = {
      doctorname: currentdoctor.name,
      specialist: currentdoctor.speciality,
      fees: currentdoctor.fees,
      date: dayjs(value).format("ddd, MMM D, YYYY"),
      time,
      phone: currentdoctor.phone,
      image: currentdoctor.image,
      isavailabel: currentdoctor.available,
      Patient_details: {
        patientsname: Patientsname.name,
        gender: Patientsname.gender,
        age: calculateAge(Patientsname?.dob),
        email: Patientsname.email,
      },
    };

    const response = await axiosInstance.post("/appointments/create", appoinment);
    if (response.data.success) {
      message.success("Appointment booked");
      navigator("/my-appoinment");
    } else {
      message.error("Failed to book appointment");
    }
  };

  // Handle time change
  const handeltime = (time) => setTime(time);

  const onChange = (timeValue, timeString) => setTime(timeString);

  // Generate time slots in 12-hour format
  const generateslote = () => {
    const [hourStr, minuteStr, period] = time.split(/[: ]/);
    let hours = Number(hourStr);
    const minutes = Number(minuteStr);

    // Convert to 24-hour for Date
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    let start = new Date();
    start.setHours(hours, minutes, 0, 0);

    let result = [];
    for (let i = 0; i < 10; i++) {
      let h = start.getHours();
      let m = start.getMinutes().toString().padStart(2, "0");
      let p = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      result.push(`${h}:${m} ${p}`);
      start.setMinutes(start.getMinutes() + 30);
    }
    setSlote(result);
  };

  useEffect(() => {
    generateslote();
  }, [time]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold text-red-700">Select a Time</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <div className="flex flex-col items-center gap-4">
          <TimePicker
            defaultValue={dayjs(time, "h:mm A")}
            format="h:mm A"
            onChange={onChange}
            className="w-full"
          />
          <div className="flex flex-wrap justify-center gap-2">
            {time === "" ? (
              <span className="text-red-500">Please Select Time</span>
            ) : (
              slote.map((slot, i) => (
                <p
                  key={i}
                  className={`text-sm px-3 py-2 cursor-pointer rounded-lg shadow-md transition-colors ${
                    time === slot ? "bg-sky-500 text-white" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => handeltime(slot)}
                >
                  {slot}
                </p>
              ))
            )}
          </div>
        </div>
      </div>

      <p className="text-gray-600 font-medium">
        Selected Time: <span className="text-indigo-600">{time}</span>
      </p>

      <div className="w-full mt-4">
        <h3 className="text-xl font-semibold text-red-700 text-center mb-2">Select a Date</h3>
        <div className="flex justify-center w-full">
          <Calendar onChange={setValue} value={value} className="react-calendar rounded-md shadow-md w-full max-w-md" />
        </div>
        <p className="mt-4 text-gray-600 font-medium text-center">
          Selected Date: <span className="text-indigo-600">{dayjs(value).format("ddd, MMM D, YYYY")}</span>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-5 w-full">
        {filderdata.map((user, id) => {
          const isDisabled = !user.available;
          return (
            <div key={id} className="flex flex-col w-full sm:w-auto">
              <button
                onClick={handelappoinment}
                disabled={isDisabled}
                className={`py-2 px-6 rounded-2xl font-semibold w-full sm:w-auto transition-colors ${
                  isDisabled ? "cursor-not-allowed bg-sky-200" : "bg-sky-500 text-white hover:bg-sky-600"
                }`}
              >
                Book Appointment
              </button>
              {isDisabled && <span className="text-red-500 mt-1 text-center sm:text-left">{user.name} is not Available</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Appoinment;

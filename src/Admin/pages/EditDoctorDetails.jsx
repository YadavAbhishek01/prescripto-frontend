import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import DoctorContext from "../../contextApi/DoctorContext";
import { MoonLoader } from "react-spinners";
import axiosInstance from "../../utils/axiosInstance";
const EditDoctorDetails = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const { backendUrl, admintoken } = useContext(DoctorContext);

  const [Doctorname, setDoctorName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState(null);
  const [Speciality, setSpeciality] = useState("");
  const [degree, setDegree] = useState("");
  const [Phone, setPhone] = useState("");
  const [Experiance, setExperiance] = useState("");
  const [About, setAbout] = useState("");
  const [Fees, setFees] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [Status, setStatus] = useState(false);
  const [validPhone, setvalidPhone] = useState(false);
  const [phonetouch, setPhonetouch] = useState(false);
  const [isloding, setIsLoading] = useState(false);

  const phoneregex = /^[6-9]\d{9}$/;

  // Fetch doctor details
  useEffect(() => {
    const getdoctordetails = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/admin/all-doctors`,
          { headers: { admintoken } }
        );
        if (data.success) {
          const doc = data.doctors.find((d) => d._id === id);
          if (doc) {
            setDoctorName(doc.name);
            setEmail(doc.email);
            setPassword(doc.password);
            setDegree(doc.degree);
            setSpeciality(doc.speciality);
            setPhone(doc.phone);
            setExperiance(doc.experience);
            setFees(doc.fees);
            setAbout(doc.about);
            setAddress1(doc.address.line1);
            setAddress2(doc.address.line2);
            setCurrentImage(doc.image);
            setStatus(doc.available);
          }
        } else {
          message.error(data.message || "Failed to fetch doctor details");
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
        message.error("Server error while fetching doctor details");
      }
    };
    getdoctordetails();
  }, [backendUrl, admintoken, id]);

  // Handle submit
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("name", Doctorname);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("degree", degree);
      formdata.append("speciality", Speciality);
      formdata.append("phone", Phone);
      formdata.append("experience", Experiance);
      formdata.append("fees", Number(Fees));
      formdata.append("about", About);
      formdata.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formdata.append("image", image || currentImage);
      formdata.append("available", Status);

      setIsLoading(true);
      const { data } = await axiosInstance.put(
        `/admin/edit-doctor/${id}`,
        formdata,
        { headers: { admintoken } }
      );

      if (data.success) {
        message.success(data.message);
        navigator("/doctor-list");
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.error("Error updating doctor details:", error);
      message.error("Server error while updating doctor details");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto bg-white shadow-lg rounded-2xl relative">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigator("/doctor-list")}
        >
          <img
            src="https://img.icons8.com/?size=100&id=26191&format=png&color=0ea5e9"
            alt="Back"
            className="w-6 h-6"
          />
          <span className="text-sky-600 font-medium">Back to List</span>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700">
          Edit Doctor Details
        </h2>
      </div>

      <form
        onSubmit={handlesubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Doctor Name
            </label>
            <input
              value={Doctorname}
              onChange={(e) => setDoctorName(e.target.value)}
              type="text"
              placeholder="Dr. Alice Smith"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="abc@gmail.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              maxLength={16}
              minLength={8}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Degree
            </label>
            <input
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              type="text"
              placeholder="MBBS"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Specialty
            </label>
            <input
              value={Speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              type="text"
              placeholder="Cardiology"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone
            </label>
            <input
              value={Phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setvalidPhone(phoneregex.test(e.target.value));
              }}
              type="tel"
              maxLength={10}
              onBlur={() => setPhonetouch(true)}
              placeholder="9599562615"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
              required
            />
            {phonetouch &&
              (validPhone ? (
                <span className="text-green-500 text-xs">✅ Valid Phone</span>
              ) : (
                <span className="text-red-500 text-xs">❌ Invalid Phone</span>
              ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Experience
            </label>
            <input
              value={Experiance}
              onChange={(e) => setExperiance(e.target.value)}
              type="text"
              placeholder="12 years"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Appointment Fees ($)
            </label>
            <input
              value={Fees}
              onChange={(e) => setFees(e.target.value)}
              type="number"
              placeholder="150"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              About
            </label>
            <textarea
              value={About}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Experienced cardiologist specializing in heart diseases..."
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Address
            </label>
            <input
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              type="text"
              placeholder="Address Line 1"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none mb-2"
              required
            />
            <input
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              type="text"
              placeholder="Address Line 2"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
            />
            <img
              src={image ? URL.createObjectURL(image) : currentImage}
              alt="Doctor"
              className="w-32 h-32 object-cover rounded mt-3 border"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={Status}
              onChange={(e) => setStatus(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="isActive" className="text-sm text-gray-600">
              Active Doctor
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-sky-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-sky-600 transition"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Loading Overlay */}
      {isloding && (
        <div className="fixed inset-0 bg-black/40 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white shadow-2xl rounded-2xl px-8 py-6 flex flex-col items-center justify-center space-y-4 border border-gray-200">
            <MoonLoader color="#0ea5e9" size={60} speedMultiplier={1.2} />
            <p className="text-sky-600 text-lg font-semibold animate-pulse">
              Updating Doctor, please wait...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditDoctorDetails;

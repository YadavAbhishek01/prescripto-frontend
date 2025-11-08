import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import Imagepreview from "../Componets/ImagePreview/Imagepreview";
import axiosInstance from "../utils/axiosInstance";
const EditProfile = () => {
  const navigate = useNavigate();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [image, setImage] = useState(null);
  const [userdata, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axiosInstance.get("/user/getuser", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = res.data.user;
        setUserData(user);
        setFullName(user.name || "");
        setEmail(user.email || "");
        setAddress(user.address || "");
        setPhone(user.phone_number || "");
        setGender(user.gender || "");
        setBirthdate(user.dob || "");
        setImage(user.image || null);
      } catch (err) {
        message.error("Failed to fetch user data");
      }
    };
    fetchUser();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", fullname);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phone_number", phone);
    formData.append("gender", gender);
    formData.append("dob", birthdate);
    if (image instanceof File) formData.append("image", image);

    try {
      const res = await axiosInstance.put(
        `/user/update-profile/${userdata._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );
      if (res.data.success) {
        message.success("Profile updated successfully");
        navigate("/profile");
      } else {
        message.error(res.data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
  <div className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-10">
    <h2 className="text-4xl font-extrabold text-center text-sky-600 mb-10">
      Edit Profile
    </h2>

    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Your address"
          className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
          rows={3}
        />
      </div>

      {/* Phone & Birthdate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="123-456-7890"
            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Birthdate</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Gender */}
      <div>
        <span className="block mb-2 text-gray-700 font-medium">Gender</span>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
              className="h-5 w-5 text-sky-600"
            />
            Male
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
              className="h-5 w-5 text-pink-500"
            />
            Female
          </label>
        </div>
      </div>

      {/* Profile Image */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">Profile Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-3" />
        <Imagepreview image={image instanceof File ? URL.createObjectURL(image) : image} />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default EditProfile;

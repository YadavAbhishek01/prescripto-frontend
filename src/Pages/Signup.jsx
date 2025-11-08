import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { message } from "antd";
import axiosInstance from "../utils/axiosInstance";
import DoctorContext from "../contextApi/DoctorContext";

function Signup() {
  const { backendUrl } = useContext(DoctorContext);
  const navigate = useNavigate();

  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [Address, setAddress] = useState("");
  const [Phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [Birthdate, setBirthdate] = useState("");

  const [nametouch, setNameTouch] = useState(false);
  const [emailtouch, setEmailTouch] = useState(false);
  const [passwordtouch, setPasswordTouch] = useState(false);
  const [confirmpasswordtouch, setConfirmPasswordTouch] = useState(false);
  const [phonetouch, setPhoneTouch] = useState(false);

  const [Validname, setValidName] = useState(null);
  const [Validemail, setValidEmail] = useState(null);
  const [Validpassword, setValidPassword] = useState(null);
  const [validconfirmpassword, setValidConfirmPassword] = useState(null);
  const [ValidPhone, setValidPhone] = useState(null);

  const [showpassword, setShowPassword] = useState(false);
  const [Showconfirmpassoword, setsshowconfirmPassword] = useState(false);

  const nameregex = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
  const emailregex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const passwordregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phoneregex = /^[6-9]\d{9}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isvalidname = nameregex.test(fullname);
    const isvalidemail = emailregex.test(email);
    const isvalidpassword = passwordregex.test(password);
    const isConfirmPassword = password === confirmpassword;
    const isvalidPhone = phoneregex.test(Phone);

    setValidName(isvalidname);
    setValidEmail(isvalidemail);
    setValidPassword(isvalidpassword);
    setValidConfirmPassword(isConfirmPassword);
    setValidPhone(isvalidPhone);

    if (
      isvalidname &&
      isvalidemail &&
      isvalidpassword &&
      isConfirmPassword &&
      isvalidPhone
    ) {
      try {
        const response = await axiosInstance.post(`/user/signup`, {
          name: fullname,
          email: email.toLowerCase(),
          password,
          address: Address,
          phone_number: Phone,
          gender,
          dob: Birthdate,
        });

        if (response.data.success) {
          message.success("Signup successful!");
          navigate("/login");

          setFullName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setAddress("");
          setPhone("");
          setGender("");
          setBirthdate("");

          setNameTouch(false);
          setEmailTouch(false);
          setPasswordTouch(false);
          setConfirmPasswordTouch(false);
          setPhoneTouch(false);
          setValidName(null);
          setValidEmail(null);
          setValidPassword(null);
          setValidConfirmPassword(null);
          setValidPhone(null);
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        message.error("Something went wrong!");
      }
    } else {
      message.error("Please fill all fields correctly!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden">
        {/* Left Illustration */}
        <div className="lg:flex-1 bg-blue-100  flex-col items-center justify-center p-8 hidden lg:flex">
          <img
            src="https://img.icons8.com/fluency/200/doctors-bag.png"
            alt="Signup Illustration"
            className="mb-4"
          />
          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            Welcome to Prescripto
          </h2>
          <p className="text-gray-700 text-center">
            Manage your healthcare easily. Connect with certified doctors, book
            appointments instantly, and track your health records.
          </p>
        </div>

        {/* Right Form */}
        <div className="lg:flex-1 p-8">
          <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block mb-1 font-semibold">Full Name</label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setValidName(nameregex.test(e.target.value));
                  if (!nametouch) setNameTouch(true);
                }}
                onBlur={() => setNameTouch(true)}
                placeholder="Enter your full name"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                required
              />
              {nametouch && fullname !== "" && Validname !== null && (
                <span
                  className={`text-sm mt-1 ${
                    Validname ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {Validname ? "Valid Name" : "Invalid Name"}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setValidEmail(emailregex.test(e.target.value));
                  if (!emailtouch) setEmailTouch(true);
                }}
                onBlur={() => setEmailTouch(true)}
                placeholder="Enter your email"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                required
              />
              {emailtouch && email !== "" && Validemail !== null && (
                <span
                  className={`text-sm mt-1 ${
                    Validemail ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {Validemail ? "Valid Email" : "Invalid Email"}
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-semibold">Password</label>
              <div className="flex items-center relative">
                <input
                  type={showpassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setValidPassword(passwordregex.test(e.target.value));
                    if (!passwordtouch) setPasswordTouch(true);
                  }}
                  onBlur={() => setPasswordTouch(true)}
                  placeholder="Enter your password"
                  className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                  maxLength={16}
                  required
                />
                <div
                  className="absolute right-3 cursor-pointer text-xl text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showpassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </div>
              </div>
              {passwordtouch && password !== "" && Validpassword !== null && (
                <span
                  className={`text-sm mt-1 ${
                    Validpassword ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {Validpassword ? "Valid Password" : "Invalid Password"}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 font-semibold">Confirm Password</label>
              <div className="flex items-center relative">
                <input
                  type={Showconfirmpassoword ? "text" : "password"}
                  value={confirmpassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setValidConfirmPassword(e.target.value === password);
                    if (!confirmpasswordtouch) setConfirmPasswordTouch(true);
                  }}
                  onBlur={() => setConfirmPasswordTouch(true)}
                  placeholder="Confirm your password"
                  className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                  required
                />
                <div
                  className="absolute right-3 cursor-pointer text-xl text-gray-600"
                  onClick={() => setsshowconfirmPassword((prev) => !prev)}
                >
                  {Showconfirmpassoword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </div>
              </div>
              {confirmpasswordtouch &&
                confirmpassword !== "" &&
                validconfirmpassword !== null && (
                  <span
                    className={`text-sm mt-1 ${
                      validconfirmpassword ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {validconfirmpassword
                      ? "Password Match"
                      : "Password Not Match"}
                  </span>
                )}
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1 font-semibold">Address</label>
              <textarea
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-semibold">Phone Number</label>
              <input
                type="tel"
                value={Phone}
                maxLength={10}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setValidPhone(phoneregex.test(e.target.value));
                  if (!phonetouch) setPhoneTouch(true);
                }}
                onBlur={() => setPhoneTouch(true)}
                placeholder="91+ 1234567890"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                required
              />
              {phonetouch && Phone !== "" && ValidPhone !== null && (
                <span
                  className={`text-sm mt-1 ${
                    ValidPhone ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {ValidPhone ? "Valid Phone Number" : "Invalid Phone Number"}
                </span>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-1 font-semibold">Gender</label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="h-4 w-4 text-green-500"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="h-4 w-4 text-green-500"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            {/* Birthdate */}
            <div>
              <label className="block mb-1 font-semibold">Date Of Birth</label>
              <input
                type="date"
                value={Birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Sign Up
            </button>
          </form>

          <p
            onClick={() => navigate("/login")}
            className="mt-4 text-center text-gray-500 text-sm cursor-pointer"
          >
            Already have an account?{" "}
            <span className="text-blue-500 underline">Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

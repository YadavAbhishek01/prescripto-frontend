import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "@ant-design/v5-patch-for-react-19";
import { message } from "antd";
import axiosInstance from "../utils/axiosInstance";
import DoctorContext from "../contextApi/DoctorContext";

const Login = () => {
  const { admin } = useParams();
  const navigate = useNavigate();

  const { setAdmintoken } = useContext(DoctorContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (admin) {
        // 🔹 Admin Login
        const { data } = await axiosInstance.post(`/admin/login`, {
          email,
          password,
        });

    
        if (data.success) {
          
          const token=data.token
          setAdmintoken(token);
     
          localStorage.setItem("admintoken", token);
          localStorage.setItem("role", "Admin");
          localStorage.setItem("Admin", email);
          message.success("Admin login successful");

          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 1000);
        } else {
          message.error(data.message || "Invalid admin credentials");
          setEmail('')
          setPassword('')
        }
      } else {
        // 🔹 User Login
        const { data } = await axiosInstance.post(`/user/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", "user");
          localStorage.setItem("Loginuser", email);
          message.success("User login successful");

          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 1000);
        } else {
          message.error(data.message || "Invalid user credentials");
           setEmail('')
          setPassword('')
        }
      }
    } catch (error) {
      console.error(error);
      message.error("Server error — please try again");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <h2
          className={`text-3xl font-extrabold mb-6 text-center ${
            admin ? "text-sky-700" : "text-indigo-700"
          }`}
        >
          {admin ? "Admin Login" : " Login"}
        </h2>

        {/* 🔹 Demo Credentials Box */}
          {admin ? (
             <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6 text-sm text-gray-700 shadow-sm">
                  <p className="font-semibold text-sky-800">Demo Admin:</p>
              <p>
                Email: <span className="font-medium">emily.carter@gmail.com</span>
              </p>
              <p>
                Password: <span className="font-medium">admin123</span>
              </p>
        </div> 
            
         
          ) : ''}
       

        {/* 🔹 Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder={
                admin ? "admin@example.com" : "user@example.com"
              }
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-semibold text-gray-700">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder={admin ? "admin123" : "user123"}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-2 rounded-lg font-semibold hover:bg-sky-600 transition"
          >
            Login
          </button>
        </form>

        {/* 🔹 Navigation Links */}
        <p className="mt-4 text-center text-gray-500 text-sm">
          Forgot your password?
        </p>
        <p
          onClick={() => {
            admin ? navigate("/login") : navigate("/signup");
          }}
          className="mt-2 text-center text-gray-700 text-sm"
        >
          {admin ? "Login as User" : "Create a new account"}{" "}
          <span className="text-sky-500 cursor-pointer hover:underline">
            Click Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

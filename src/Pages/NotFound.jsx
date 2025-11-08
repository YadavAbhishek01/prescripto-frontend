import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-6">
        Oops! Page Not Found
      </p>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-sky-500 text-white py-2 px-6 rounded-lg hover:bg-sky-600 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;

import { createContext, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

export const DoctorContext = createContext();

export const DoctorContextProvider = ({ children }) => {
  const [admintoken, setAdmintoken] = useState(() => {
    return localStorage.getItem("admintoken") || null;
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(backendUrl)
  useEffect(() => {
    if (admintoken) {
      localStorage.setItem("admintoken", admintoken);
    } else {
      localStorage.removeItem("admintoken");
    }
  }, [admintoken]);

  console.log("Admin Token:", admintoken);

  return (
    <DoctorContext.Provider value={{ backendUrl, admintoken, setAdmintoken }}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContext;

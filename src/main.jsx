import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import DoctorContext, { DoctorContextProvider } from "./contextApi/DoctorContext.jsx";
createRoot(document.getElementById("root")).render(
   
  <StrictMode>
     <BrowserRouter >
     <DoctorContextProvider>
      <App  />
  </DoctorContextProvider>
       </BrowserRouter>
  </StrictMode>
   
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bottom from "./components/bottom/bottom";
import FormList from "./components/FormList";
import Login from "./components/login/login";
import HomePage from "./views/homepage";
import SignUp from "./components/signUp/signUp";
import OTPMail from "./components/OTP/otpMail";
import LoginOTP from "./components/login/loginOTP";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="formlist" element={<FormList />} />
      <Route path="createform/:id" element={<App />} />
      <Route path="formdetails/:id" element={<Bottom />} />
      <Route path="otpmail" element={<OTPMail />} />
      <Route path="loginOTP" element={<LoginOTP />} />
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

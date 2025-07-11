import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Result from "./pages/Result.jsx";
import Calculator from "./pages/Calculator.jsx";
import CarbonTracker from "./pages/CarbonTracker.jsx";
import ApplianceEstimator from "./pages/ApplianceEstimator.jsx";
import WeatherSuggestion from "./pages/WeatherSuggestion.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/result" element={<Result />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/carbontracker" element={<CarbonTracker />} />
      <Route path="/estimator" element={<ApplianceEstimator />} />
      <Route path="/weather" element={<WeatherSuggestion/>}/>
      <Route path="*" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

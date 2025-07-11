import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CarbonTracker.css";

const EMISSION_FACTOR = 0.82; // kg CO2 per kWh (India avg.)

const CarbonTracker = () => {
  const [devices, setDevices] = useState([]);
  const [totalCO2, setTotalCO2] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("devices");
    if (stored) {
      const parsed = JSON.parse(stored);
      setDevices(parsed);

      const totalKWh = parsed.reduce((sum, d) => {
        return sum + ((d.wattage * d.hours) / 1000) * 30;
      }, 0);

      const co2 = totalKWh * EMISSION_FACTOR;
      setTotalCO2(co2.toFixed(2));
    }
  }, []);

  return (
    <>
      <div className="electric-effect-background" />
      <div className="carbon-container">
        <h1 className="carbon-title">🌍 Carbon Footprint Overview</h1>
        <p className="carbon-sub">Monthly estimate based on your device usage</p>

        <div className="carbon-meter">
          <div className="carbon-value">{totalCO2} kg CO₂</div>
          <div className="carbon-description">
            This is equivalent to:
            <ul>
              <li>🚗 Driving ~{Math.round(totalCO2 / 0.2)} km in a car</li>
              <li>🌲 {Math.round(totalCO2 / 21)} trees needed to offset</li>
              <li>💡 Powering a home for {Math.round(totalCO2 / 150)} weeks</li>
            </ul>
          </div>
        </div>

        <button className="back-button" onClick={() => navigate("/dashboard")}>
          ⬅ Back to Dashboard
        </button>
      </div>
    </>
  );
};

export default CarbonTracker;

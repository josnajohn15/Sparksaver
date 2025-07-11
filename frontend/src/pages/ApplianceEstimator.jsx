// src/pages/ApplianceEstimator.jsx
import React, { useState } from "react";
import { classifyApplianceWithHF } from "../utils/hfClassify";
import applianceData from "../data/applianceData";
import "./ApplianceEstimator.css";

const ApplianceEstimator = () => {
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    const uploaded = e.target.files[0];
    setFile(uploaded);
    setImageURL(URL.createObjectURL(uploaded));
    setPrediction(null);
  };

  const classify = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const result = await classifyApplianceWithHF(file);
      const topLabel = result.label.toLowerCase();

      let match = null;
      for (let appliance in applianceData) {
        if (topLabel.includes(appliance.toLowerCase())) {
          const brands = Object.keys(applianceData[appliance]);
          match = { appliance, brand: brands[0] };
          break;
        }
      }

      if (match) {
        const wattage = applianceData[match.appliance][match.brand];
        setPrediction({ ...match, wattage });
      } else {
        setPrediction({ error: "Unknown appliance. Try a clearer image." });
      }
    } catch (err) {
      console.error(err);
      setPrediction({ error: "Error while classifying. Try again." });
    }
    setLoading(false);
  };

  return (
    <div className="estimator-container">
      <h1>📷 Appliance Estimator</h1>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {imageURL && <img src={imageURL} alt="Preview" id="estimator-image" />}
      {file && (
        <button onClick={classify} disabled={loading}>
          {loading ? "🔄 Classifying..." : "🔍 Detect Appliance"}
        </button>
      )}
      {prediction && (
        <div className="result">
          {prediction.error ? (
            <p className="error">{prediction.error}</p>
          ) : (
            <div>
              <p>✅ Appliance: {prediction.appliance}</p>
              <p>✅ Brand: {prediction.brand}</p>
              <p>⚡ Wattage Estimate: {prediction.wattage} W</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplianceEstimator;

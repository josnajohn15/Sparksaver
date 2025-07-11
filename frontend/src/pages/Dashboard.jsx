// src/pages/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const features = [
  { name: "Live Calculator", route: "/calculator", icon: "⚙️" },
  { name: "Recommendations", route: "/recommend", icon: "💡" },
  { name: "Carbon Tracker", route: "/carbontracker", icon: "🌍" },
  { name: "Appliance Estimator", route: "/estimator", icon: "📷" },
  { name: "Weather Based Suggestions", route: "/weather", icon: "⛅" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="electric-effect-background" />

      {/* Logout Button */}
      <div className="logout-container">
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* Sparks Background */}
      <div className="spark-animation"></div>

      <div className="dashboard-wrapper">
        <div className="dashboard-container glassy-blur">
          <h1 className="dashboard-title glow-text flicker">
            ⚡ SparkSaver Dashboard
          </h1>
          <p className="dashboard-sub glow-sub">
            One stop for energy intelligence, efficiency & sustainability 🌱
          </p>

          <div className="neon-divider" />

          <div className="feature-grid">
            {features.map((f, index) => (
              <div
                key={f.name}
                className="feature-card animated-glow"
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => navigate(f.route)}
              >
                <div className="icon">{f.icon}</div>
                <div className="label">{f.name}</div>
              </div>
            ))}
          </div>

          <footer className="dashboard-footer">
            <p className="footer-text">
              🔋 Powering the Future • <span className="highlight">SparkSaver 2025</span>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

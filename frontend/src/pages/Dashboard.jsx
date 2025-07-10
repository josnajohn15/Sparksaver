// src/pages/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const features = [
  { name: "Live Calculator", route: "/calculator", icon: "⚙️" },
  { name: "Recommendations", route: "/recommend", icon: "💡" },
  { name: "Carbon Tracker", route: "/carbon", icon: "🌍" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="electric-effect-background" />
      <div className="logout-container">
  <button className="logout-button" onClick={() => {
    localStorage.removeItem("token");
    navigate("/login");
  }}>
    🚪 Logout
  </button>
</div>

      <div className="dashboard-wrapper">
        <div className="dashboard-container">
          <h1 className="dashboard-title glow-text flicker">⚡ Welcome to SparkSaver</h1>
          <p className="dashboard-sub glow-sub">Your personalized energy assistant</p>

          <div className="neon-divider"></div>

          <div className="feature-grid">
            {features.map((f, index) => (
              <div
                key={f.name}
                className="feature-card glass-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(f.route)}
              >
                <div className="icon glow-icon">{f.icon}</div>
                <div className="label glow-label">{f.name}</div>
              </div>
            ))}
          </div>

          <div className="bottom-glow" />
          <footer className="dashboard-footer">
            <p className="footer-text">🔋 Powering the Future • <span className="highlight">SparkSaver 2025</span></p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
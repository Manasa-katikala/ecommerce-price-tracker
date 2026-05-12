import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing-content">
        <div className="landing-badge">🏷️ Smart Shopping Assistant</div>
        <h1 className="landing-title">
          Never Miss a <span className="highlight">Price Drop</span> Again
        </h1>
        <p className="landing-description">
          Track your favorite products across multiple e-commerce platforms.
          Get instant alerts when prices drop and save money on every purchase.
        </p>

        <div className="landing-features">
          <div className="feature">
            <span className="feature-icon">📊</span>
            <span>Real-time Tracking</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🔔</span>
            <span>Instant Alerts</span>
          </div>
          <div className="feature">
            <span className="feature-icon">💰</span>
            <span>Save Money</span>
          </div>
        </div>

        <div className="landing-buttons">
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;

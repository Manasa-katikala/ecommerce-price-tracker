import React, { useEffect, useState } from "react";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/alerts")   // ✅ FIXED
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch(() => alert("Failed to load alerts"));
  }, []);

  return (
    <div className="alerts-page">
      <h2>Price Drop Notifications</h2>

      {alerts.length === 0 ? (
        <p>No alerts available</p>
      ) : (
        alerts.map((alert) => (
          <div className="alert-card" key={alert._id}>
            <p>{alert.message}</p>
            <small>{new Date(alert.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default Alerts;

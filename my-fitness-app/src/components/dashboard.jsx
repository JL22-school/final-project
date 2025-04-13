import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'; // Import the CSS file

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome {user ? user.username : 'User'}!</h2>
      <p className="dashboard-text">This is your fitness dashboard.</p>
      <button className="dashboard-logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
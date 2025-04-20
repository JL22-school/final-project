import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'; // Link to the CSS file for styling

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate(); // Hook to navigate between pages

  return (
    <div className="dashboard-container">
      {/* Display a welcome message */}
      <h2 className="dashboard-title">Welcome {user ? user.username : 'User'}!</h2>
      <p className="dashboard-text">This is your fitness dashboard.</p>

      {/* Buttons to navigate to different tracking pages */}
      <div className="dashboard-buttons">
        <button onClick={() => navigate('/meals')}>Track Meals</button>
        <button onClick={() => navigate('/workouts')}>Track Workouts</button>
        <button onClick={() => navigate('/progress')}>Track Weight</button>
      </div>

      {/* Logout button */}
      <button className="dashboard-logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
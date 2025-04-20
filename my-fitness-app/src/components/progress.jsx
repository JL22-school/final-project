import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './progress.css'; // Link to the CSS file for styling

const Progress = ({ user }) => {
  // State variables to store the date, weight, and any messages
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate(); // Hook to navigate between pages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !weight) {
      setMessage('Please enter both date and weight.');
      return;
    }

    try {
      // Send a POST request to log the progress entry
      const res = await fetch('http://localhost:3000/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          date,
          weight: parseFloat(weight),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Weight entry logged!');
        setDate('');
        setWeight('');
      } else {
        setMessage(data.error || 'Error logging weight.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong.');
    }
  };
//HTML
  return (
    <div className="progress-container">
      <h2>Track Your Weight</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Weight (lbs):</label>
          <input
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Entry</button>
      </form>
      {message && <p>{message}</p>}
      <button className="return-button" onClick={() => navigate('/dashboard')}>
        Return to Dashboard
      </button>
    </div>
  );
};

export default Progress;
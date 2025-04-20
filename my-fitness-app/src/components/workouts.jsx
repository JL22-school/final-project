import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './workouts.css'; // Link to workouts.css

const Workouts = ({ user }) => {
  // State variables for workout details and messages
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to navigate between pages

  // Handle form submission to log a workout
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!exercise || !sets || !reps || !weight || !date) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      // Send a POST request to log the workout
      const response = await fetch('http://localhost:3000/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user?.id, // Include the user's ID
          date,
          exercise,
          sets,
          reps,
          weight,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Workout logged successfully!'); // Success message
        setExercise(''); // Clear the exercise input
        setSets(''); // Clear the sets input
        setReps(''); // Clear the reps input
        setWeight(''); // Clear the weight input
        setDate(''); // Clear the date input
      } else {
        setMessage(data.error || 'Error logging workout.'); // Error message
      }
    } catch (err) {
      console.error('Error:', err); // Log any errors to the console
      setMessage('Something went wrong.'); // Display a generic error message
    }
  };

  return (
    <div className="workouts-container">
      <h2>Log a Workout</h2>
      {/* Form to log a workout */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Exercise:</label>
          <input
            type="text"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)} // Update exercise state
            required
          />
        </div>
        <div>
          <label>Sets:</label>
          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(e.target.value)} // Update sets state
            required
          />
        </div>
        <div>
          <label>Reps:</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)} // Update reps state
            required
          />
        </div>
        <div>
          <label>Weight (lbs):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)} // Update weight state
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)} // Update date state
            required
          />
        </div>
        <button type="submit">Log Workout</button> {/* Submit button */}
      </form>

      {/* Display success or error messages */}
      {message && <p>{message}</p>}

      {/* Button to return to the dashboard */}
      <button className="return-button" onClick={() => navigate('/dashboard')}>
        Return to Dashboard
      </button>
    </div>
  );
};

export default Workouts;
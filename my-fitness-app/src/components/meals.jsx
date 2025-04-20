import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './meals.css'; // Link to meals.css

const Meals = ({ user }) => {
  // State variables for meal details and messages
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to navigate between pages

  // Handle form submission to log a meal
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mealName || !calories || !date) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      // Send a POST request to log the meal
      const response = await fetch('http://localhost:3000/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user?.id, // Include the user's ID
          meal_name: mealName,
          calories: parseInt(calories, 10),
          date,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Meal logged successfully!'); // Success message
        setMealName(''); // Clear the meal name input
        setCalories(''); // Clear the calories input
        setDate(''); // Clear the date input
      } else {
        setMessage(data.error || 'Error logging meal.'); // Error message
      }
    } catch (err) {
      console.error(err); // Log any errors to the console
      setMessage('Something went wrong.'); // Display a generic error message
    }
  };

  return (
    <div className="meals-container">
      <h2>Log a Meal</h2>
      {/* Form to log a meal */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Meal Name:</label>
          <input
            type="text"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)} // Update meal name state
            required
          />
        </div>
        <div>
          <label>Calories:</label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)} // Update calories state
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
        <button type="submit">Add Meal</button> {/* Submit button */}
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

export default Meals;
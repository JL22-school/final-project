import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import './register.css'; // Link to register.css

const Register = () => {
  // State variables for username, password, and error messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate between pages

  // Handle form submission to register a new user
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      // Send a POST request to register the user
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed'); // Display error message
      } else {
        navigate('/login'); // Navigate to login page on success
      }
    } catch (err) {
      console.error(err); // Log any errors to the console
      setError('Something went wrong'); // Display a generic error message
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create Account</h2>
      {/* Registration form */}
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
            className="form-input"
          />
        </div>
        {/* Display error message if registration fails */}
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="register-button">Register</button>
      </form>
      {/* Link to the login page */}
      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
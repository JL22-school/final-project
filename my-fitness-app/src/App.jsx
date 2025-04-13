import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route path="/login" element={<Login setUser={setUser} />} /> {/* Add this route */}
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
    </Routes>
  );
}

export default App;
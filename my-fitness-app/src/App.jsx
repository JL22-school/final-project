import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
//importing the pages
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import Meals from './components/meals'; 
import Workouts from './components/workouts'; 
import Progress from './components/progress'; 
//state to store user
function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
//logout
  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };
//define routes for each page
  return (
    <Routes>
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
      <Route path="/meals" element={<Meals user={user} />}/>
      <Route path="/workouts" element={<Workouts user={user} />} />
      <Route path="/progress" element={<Progress user={user} />} />
    </Routes>
  );
}

export default App;
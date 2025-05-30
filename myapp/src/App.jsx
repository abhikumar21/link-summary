import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  return isAuthenticated ? (
    <Dashboard/>
  ) : (
    <Login setIsAuthenticated={setIsAuthenticated} />
  )
};

export default App;
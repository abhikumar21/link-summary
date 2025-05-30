import React, { useState } from 'react';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'demo@test.com' && password === 'password123') {
      localStorage.setItem('token', 'demo-token');
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input mt-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn mt-4 w-full" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 to-blue-500 px-4">
      <div className="bg-white p-6 shadow-lg w-full max-w-md flex flex-col rounded-xl">
        <h2 className="text-xl font-bold mb-6 flex justify-center">Link Summary</h2>
        <input
          type="email"
          placeholder="Email"
          className="input w-full my-2 border border-gray-300 px-4 py-2 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input w-full my-2 border border-gray-300 px-4 py-2 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="btn mt-4 rounded-lg bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition">
          Login
        </button>
      </div>
    </div>

  );
};

export default Login;
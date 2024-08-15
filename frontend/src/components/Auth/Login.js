import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3307/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <>
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">Finance Tracker App</span>
            <span className="title">Login</span>
            <form onSubmit={handleLogin}> 
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' className="email" required/>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' className="password" required/>
              <button type="submit">Sign in</button>
              {loading && "Loading please wait..!"}
              {error && <span>Something went wrong</span>}
            </form>
            <p>You don't have an account? <Link to="/">Register</Link> </p>
        </div>
    </div>
    </>
  );
}

export default Login;

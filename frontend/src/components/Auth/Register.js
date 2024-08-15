import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.scss'

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.post('http://localhost:3307/api/auth/register', { email, password });
      navigate('/login');
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
            <span className="title">Register</span>
            <form onSubmit={handleRegister} method="post"> 
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' className="email" required/>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' className="password" required/>
              <button disabled={loading} type="submit" >Sign up</button>
              {loading && "Loading please wait..!"}
              {error && <span>Something went wrong</span>}
            </form>
            <p>You do have an account? <Link to="/login">Login</Link> </p>
        </div>
    </div>
    </>
  );
}

export default Register;

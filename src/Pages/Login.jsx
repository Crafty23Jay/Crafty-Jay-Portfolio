import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import Lottie from 'lottie-react';
// import loginAnimation from '../assets/login-animation.json';
// import loadingSpinner from '../assets/loading-spinner.json';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = response.data;

      // Save to localStorage
      localStorage.setItem('portfolioToken', token);
      localStorage.setItem('portfolioUser', JSON.stringify(user));

      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          {/* <Lottie animationData={loginAnimation} loop /> */}
        </div>

        <div className="login-right">
          <h2>Welcome Back, Admin</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {/* {loading ? <Lottie animationData={loadingSpinner} style={{ height: 40 }} /> : 'Login'} */}
              Login
            </button>

            {error && <p className="error">{error}</p>}
          </form>

          {/* Back to Home link */}
          <Link to="/" className="back-home-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
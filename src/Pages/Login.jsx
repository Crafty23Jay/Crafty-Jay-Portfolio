// src/Pages/Login.jsx
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { auth } from '../Firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import './Login.css';

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      let userCredential;

      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      const user = userCredential.user;

      // Redirect after login
      if (user.email === "alasatisaheedjamal@gmail.com") {
        navigate('/profile'); // You can also use /admin if preferred
      } else {
        navigate('/'); // Back to homepage
      }
    } catch (error) {
      console.error("Auth Error:", error.message);
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? 'Create Account' : 'Admin Login'}</h2>

      <form className="login-form" onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {isRegistering ? 'Register' : 'Login'}
        </button>
        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>

      <p className="toggle-auth">
        {isRegistering
          ? 'Already have an account? '
          : "Don't have an account? "}
        <span onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Login' : 'Register'}
        </span>
      </p>

      {/* ✅ Back to Home button */}
      <button
        onClick={() => navigate('/')}
        className="back-home-btn"
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          background: '#0078ff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        ← Back to Home
      </button>
    </div>
  );
}

export default Login;

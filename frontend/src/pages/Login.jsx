import React, { useState } from "react";
// Remove Firebase auth imports
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
// Import the new login function from our API service
import { login } from '../services/api';
import { auth } from '../firebase'; // Import auth from firebase client SDK
import { signInWithCustomToken } from 'firebase/auth'; // Import signInWithCustomToken
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth(); // Use login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authLogin(email, password);
      navigate('/'); // Redirect to home after successful login
    } catch (err) {
      setError(err.message || 'Failed to log in');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="form__title text-center">Login</h1>
        {error && <p className="form__error mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="email" className="form__label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form__input"
            />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form__input"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="button button--primary w-full"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-4">
          Need an account? <Link to="/signup" className="form__link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

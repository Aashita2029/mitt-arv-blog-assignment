import React, { useState } from "react";
// Remove Firebase auth imports
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

// Import the new signup function from our API service
import { signup } from '../services/api';
import { auth } from '../firebase'; // Import auth from firebase client SDK
import { signInWithCustomToken } from 'firebase/auth'; // Import signInWithCustomToken

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup: authSignup } = useAuth(); // Use signup function from AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call the new signup function from the API service
      const result = await signup(email, password, name);
      
      // Handle potential errors from the API response
      if (result.error) {
        throw new Error(result.error);
      }

      // Use the custom token received from the backend to sign in with Firebase client SDK
      await signInWithCustomToken(auth, result.token);

      // Assuming successful signup redirects or handles auth state internally
      // If the API returns user data, you might want to update auth context here
      navigate("/"); // Redirect to home after signup
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Keep or remove Google signup based on whether backend supports it or if you want to keep client-side Google auth
  // const handleGoogleSignup = async () => {
  //   setError("");
  //   setLoading(true);
  //   try {
  //     await signInWithGoogle();
  //     navigate("/"); // Redirect to home after Google signup
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="container">
      <div className="form">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        {error && <p className="form__error mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="name" className="form__label">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form__input"
            />
          </div>
          <div className="form-group">
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
          <div className="form-group">
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
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

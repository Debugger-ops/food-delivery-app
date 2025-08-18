'use client';

import { useState } from 'react';
import Link from "next/link";
import { signIn } from "next-auth/react";
import './login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setLoggingIn(true);
      setLoginError('');

      try {
        // Use NextAuth's signIn function with the "credentials" provider
        const result = await signIn("credentials", {
          redirect: false, // Handle redirection manually
          email: formData.email,
          password: formData.password,
        });

        if (result.error) {
          setLoginError(result.error);
        } else if (result.ok) {
          // Successful login, redirect to home page
          window.location.href = '/';
        }
      } catch (err) {
        setLoginError('Something went wrong. Please try again.');
        console.error("Login error:", err);
      } finally {
        setLoggingIn(false);
      }
    } else {
      setErrors(validationErrors);
    }
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-logo">
          <h1>GoldenBites</h1>
          <p>Welcome back to your culinary journey</p>
        </div>
        <div className="food-image-container">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
            alt="Delicious food"
            className="food-image"
          />
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <h2>Login to Your Account</h2>
          <p className="login-subtitle">Access your favorite meals and exclusive offers</p>

          {loginError && (
            <div className="error-banner">
              <p>{loginError}</p>
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                disabled={loggingIn}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                disabled={loggingIn}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-row between">
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={loggingIn}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>

              <div className="forgot-password">
                <Link href="/forgot-password">Forgot password?</Link>
              </div>
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={loggingIn}
            >
              {loggingIn ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="social-login">
            <button className="google-btn">Continue with Google</button>
            <button className="facebook-btn">Continue with Facebook</button>
          </div>

          <div className="register-link">
            Don't have an account? <Link href="/register">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from "next/link";
import './login.css';
export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState(false);

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
      // Process login
      setLoggingIn(true);
      setLoginError(false);
      
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify({
            email: formData.email, 
            password: formData.password
          }),
          headers: {'Content-Type': 'application/json'},
        });
        
        if (response.ok) {
          // Login successful - redirect to dashboard or home
          window.location.href = '/';
        } else {
          setLoginError(true);
        }
      } catch (err) {
        setLoginError(true);
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
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
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
              <p>Invalid email or password. Please try again.</p>
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
            <button className="google-btn">
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              Continue with Google
            </button>
            
            <button className="facebook-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div>
          
          <div className="register-link">
            Don't have an account? <Link href="/register">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from "next/link";
import './register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }
    
    return newErrors;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      // Process form submission to API
      setCreatingUser(true);
      setError(false);
      setUserCreated(false);
      
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify({
            email: formData.email, 
            password: formData.password,
            fullName: formData.fullName,
            phone: formData.phone,
            address: formData.address
          }),
          headers: {'Content-Type': 'application/json'},
        });
        
        if (response.ok) {
          setUserCreated(true);
          // Optional: redirect to login page after successful registration
          // setTimeout(() => {
          //   window.location.href = '/login';
          // }, 2000);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
        console.error("Registration error:", err);
      } finally {
        setCreatingUser(false);
      }
    } else {
      setErrors(validationErrors);
    }
  }

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="register-logo">
          <h1>GoldenBites</h1>
          <p>Create your account and start your culinary journey with us</p>
        </div>
        <div className="food-image-container">
          <img
            src="https://media.istockphoto.com/id/1303370330/photo/flat-lay-of-friends-having-quarantine-home-party-with-fast-food.jpg?s=612x612&w=0&k=20&c=IkEcw3XvE8MSvXxgqJ2ZLqrVNALLJt4YSwbj1HLiW_Q=" 
            alt="Delicious food platter" 
            className="food-image"
          />
        </div>
      </div>
      
      <div className="register-right">
        <div className="register-form-container">
          <h2>Create an Account</h2>
          <p className="register-subtitle">Join our food community and enjoy exclusive benefits</p>
          
          {userCreated && (
            <div className="success-message">
              <p>Registration successful! Welcome to GoldenBites!</p>
              <p>You can now <Link href="/login">log in</Link> to your account.</p>
            </div>
          )}
          
          {error && (
            <div className="error-banner">
              <p>Registration failed. This email may already be registered or there was a server error.</p>
            </div>
          )}
          
          {!userCreated && (
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  disabled={creatingUser}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  disabled={creatingUser}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    disabled={creatingUser}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    disabled={creatingUser}
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  disabled={creatingUser}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Delivery Address (Optional)</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your delivery address"
                  rows={3}
                  disabled={creatingUser}
                />
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  disabled={creatingUser}
                />
                <label htmlFor="agreeTerms">I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a></label>
                {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
              </div>
              
              <button 
                type="submit" 
                className="register-button"
                disabled={creatingUser}
              >
                {creatingUser ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}
          
          <div className="login-link">
            Already have an account? <Link href="/login">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
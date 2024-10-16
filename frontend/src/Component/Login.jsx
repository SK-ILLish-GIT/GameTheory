// src/Component/Login.jsx

import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  Text,
} from "@chakra-ui/react";
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Destructure login function
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        if (data.token && data.user) {
          setFormData({ email: '', password: '' });
          login(data.token, data.user); // Update auth context
          navigate('/schedule'); // Redirect to ScheduleGrid
        } else {
          setMessage('Invalid response from server.');
          console.error("Login response missing token or user:", data);
        }
      } else {
        setMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  // Function to navigate to the register page
  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <VStack spacing={4} align="stretch">
          {message && (
            <Alert status="error">
              <AlertIcon />
              {message}
            </Alert>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              minLength="8"
              className="input-field"
            />
          </div>
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </VStack>
        <p>OR</p>
        <button
          type="button"
          className="go-to-register-btn"
          onClick={goToRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;

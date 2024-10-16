// src/Component/Register.jsx

import { useState, useContext } from "react";
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
  Select, // Imported Select
} from "@chakra-ui/react";
import './Register.css';  // Import the custom CSS

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Destructure login function
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",  // Default value
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
      const res = await fetch(`https://gametheory-9xjf.onrender.com/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();

      if (res.ok && data.success) {
        if (data.token && data.user) {
          setFormData({
            name: "",
            email: "",
            password: "",
            role: "customer",
          });
          login(data.token, data.user); // Update auth context
          navigate('/schedule'); // Redirect to ScheduleGrid
        } else {
          setMessage('Invalid response from server.');
          console.error("Register response missing token or user:", data);
        }
      } else {
        setMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  // Function to navigate to login page
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <VStack spacing={4} align="stretch">
          {message && (
            <Alert status="error">
              <AlertIcon />
              {message}
            </Alert>
          )}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="input-field"
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input-field"
            >
              <option value="customer">Customer</option>
              <option value="manager">Manager</option>
            </Select>
          </div>
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </VStack>
        <p>OR</p>
        <button
          type="button"
          className="go-to-login-btn"
          onClick={goToLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/auth/signup`, {
        method: 'POST',
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: fullName,
          email: email,
          password: password,
        }),
      });

      const output = await response.json();
      console.log(output.status);
      

      if (response.ok) 
        {
        // Sign-up was successful
        setMessage('Sign up successful! You can log in now.');
        setTimeout(() => navigate('/Login'), 1000); // Redirect after 2 seconds
      } else {
        // Handle different error responses
        setMessage(output.message || 'Sign-up failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }

   
  };

  return (
    <div>
      <style>
       {`
       .signup-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9fafb; /* Lighter gray for better contrast */
}

.signup-form-wrapper {
  width: 100%;
  max-width: 400px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb; /* Subtle border */
}

.signup-title {
  font-size: 26px;
  font-weight: 600; /* Slightly bolder */
  margin-bottom: 24px;
  text-align: center;
  color: #111827; /* Darker gray */
}

.input-group {
  margin-bottom: 20px;
  position: relative; /* For toggle button */
}

.input-label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #6b7280; /* Medium gray */
}

.input-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db; /* Light gray */
  border-radius: 6px;
  box-sizing: border-box;
  color: #1f2937; /* Dark gray */
  font-size: 16px; /* Slightly larger font */
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #3b82f6; /* Focus color */
  outline: none; /* Remove outline */
}

.toggle-button {
  position: absolute;
  right: 12px;
  top: 70%; /* Center vertically */
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #3b82f6; /* Blue color */
  cursor: pointer;
  font-size: 20px;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #dc2626; /* Red color */
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600; /* Slightly bolder */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease; /* Added transform */
}

.submit-button:hover {
  background-color: #c62828; /* Darker red on hover */
  transform: translateY(-2px); /* Slight lift effect */
}

.login-text {
  margin-top: 16px;
  text-align: center;
  color: #4b5563; /* Medium gray */
}

.login-link {
  color: #3b82f6; /* Blue color */
  text-decoration: none;
  font-weight: 500; /* Medium weight */
}

.error-text {
  color: #ef4444; /* Red color */
  font-size: 12px;
  margin-top: 6px;
  text-align: center; /* Center align the error message */
}

       `}
      </style>
      <div className="signup-container">
        <div className="signup-form-wrapper">
          <h2 className="signup-title">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="fullName" className="input-label">User Name</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="input-field"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email" className="input-label">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input-field"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input-field"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="toggle-button"
              >
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <button type="submit" className="submit-button">Sign Up</button>
            {message && <div className="error-text">{message}</div>} {/* Render error message */}
          </form>
          <p className="login-text">
            Already have an account? <a href="/Login" className="login-link">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;

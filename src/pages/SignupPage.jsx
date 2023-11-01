import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "../styles/SignupPage.css";



const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleFullname = (e) => setFullname(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { username, password, fullname };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response);
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <div className="bg-overlay"></div>
      <form onSubmit={handleSignupSubmit} className="signup-form">
        <h3 className="signup-title">Sign Up</h3>
        <label htmlFor="username" className="input-label">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleUsername}
          className="input-field"
          autoComplete="off"
        />
        <label htmlFor="password" className="input-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
          className="input-field"
          autoComplete="off"
        />
        <label htmlFor="fullname" className="input-label">
          Full name
        </label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          value={fullname}
          onChange={handleFullname}
          className="input-field"
          autoComplete="off"
        />
        <button type="submit" className="submit-button">
          Create Account
        </button>
      </form>
      

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p className="login-text">Already have an account?</p>
      <Link to="/login" className="login-link">
        Log in
      </Link>
    </div>
  );
}

export default SignupPage;

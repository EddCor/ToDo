import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../styles/LoginPage.css";


const API_URL = "http://localhost:5005";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data);

        storeToken(response.data.token);
        authenticateUser();
        navigate("/taskManager");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <div className="bg-overlay"></div>
      <form onSubmit={handleLoginSubmit} className="login-form">
        <h3 className="login-title">Login</h3>
        <label htmlFor="username" className="input-label">
          User Name
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
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p className="login-text">Don't have an account yet?</p>
      <Link to="/signup" className="signup-link">
        Sign Up
      </Link>
    </div>
  );
}

export default LoginPage;

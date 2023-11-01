import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/HomePage.css"

function HomePage() {
  return (
    <div className="home-container">
      <h1 className="title">Welcome to the Task Manager App</h1>
      <p className="description">
        This app helps you organize and manage your tasks efficiently. Stay organized and get things done!
      </p>
      <Link to="/signup" className="signup-link">
        <button className="signup-button">Sign Up</button>
      </Link>
    </div>
  );
}

export default HomePage;

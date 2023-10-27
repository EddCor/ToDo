import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import logoImage from "../logo_transparent.png";
import "../styles/navbar.css";
import "../App";



function NavBar() {
  const [isNavExpanded, setIsNavExpanded] = useState(true);

  return (
    <nav className="nav">
      <a href="/" className="app-name">ToDo</a>
      <div className="logo">
        <img src={logoImage} alt="Logo" className="logo-icon" />
      </div>
      <ul>
      <li><Link to="/signup" className="nav-button">SignUp</Link> </li>
      <li><Link to="/login" className="nav-button">Login</Link></li>
      <li><Link to="/profile" className="nav-button">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;


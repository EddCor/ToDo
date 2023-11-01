import { Link } from "react-router-dom";
import { useState } from "react";
import logoImage from "../logo_transparent.png";
import "../styles/navbar.css";
import "../App";
import { AuthContext } from "../context/auth.context";
import React, { useContext } from "react";


function NavBar() {
  const [isNavExpanded, setIsNavExpanded] = useState(true);

  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const handleLogout = () => {
    logOutUser();
  };

  return (
    <nav className="nav">
      <a href="/" className="app-name">ToDo</a>
      <div className="logo">
        <img src={logoImage} alt="Logo" className="logo-icon" />
      </div>
      <ul>
      <li><Link to="/homepage" className="nav-button">Home</Link></li>
      <li><Link to="/signup" className="nav-button">SignUp</Link> </li>
      <li><Link to="/login" className="nav-button">Login</Link></li>
      {isLoggedIn ? (
      <li><button onClick={handleLogout} className="nav-button">Log Out</button></li>
        ) : null}
      </ul>
    </nav>
  );
}

export default NavBar;


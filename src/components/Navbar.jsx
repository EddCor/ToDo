import logo from "../components/logo_transparent.png";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../App.css";

function Navbar({ toggleSidebar }) {
  const location = useLocation();
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const getCurrentLinkText = (pathname) => {
    const routes = {
      
      "/profile": "User Profile",
      "/login": "Log In",
      "/signup": "Sign Up",
      "/taskManager": "Task Manager",
    };

    for (let route in routes) {
      let regexPattern = new RegExp("^" + route.replace(/:\w+/g, "\\w+") + "$");
      if (regexPattern.test(pathname)) {
        return routes[route];
      }
    }
    return "";
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between h-20 items-center px-4">
        {/* Left flex container for burger icon and text */}
        <div className="flex items-center space-x-2 w-1/4">
          <button
            className="flex items-center text-l py-1"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <span className="text-xl">
            {getCurrentLinkText(location.pathname)}
          </span>
        </div>

        {/* Center flex container for logo */}
        <div className="flex justify-center w-1/2">
          <img src={logo} alt="Logo" className="navimg" />
        </div>

        <div className="w-1/4 flex justify-end mr-4">
          {isLoggedIn && (
            <button className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-400" onClick={logOutUser}>Log Out</button>
          )}
          {!isLoggedIn && location.pathname !== "/login" && location.pathname !== "/signup" && (
            <Link to ="/login">
              <button className="px-6 py-1 rounded bg-blue-500 text-white hover:bg-blue-400">Log In</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

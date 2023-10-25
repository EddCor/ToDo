import {useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserProfilePage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import TaskManagerPage from './pages/TaskManagerPage';

function App() {
 
  return (
    <div className="App relative z-20 pt-20">
      <Navbar  />
      
      <div className={`content  relative z-10`}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
         
          <Route path="/profile" element={ <IsPrivate><UserProfilePage /></IsPrivate>} />
          <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
          <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
          <Route path="/taskManager" element={<IsAnon><TaskManagerPage /></IsAnon>}/>

          
        </Routes>
      </div>

    </div>
  );
}

export default App;

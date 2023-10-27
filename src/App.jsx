import {useState } from "react";
import "./App.css";
import { Link,Routes, Route, Navigate } from "react-router-dom";

import UserProfilePage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import TaskManagerPage from './pages/TaskManagerPage';
import Navbar from "./components/Navbar";

function App() {
 
  return (
   

    <>
    
    <Navbar/>
     
        <Routes>
          {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
         
          <Route path="/profile" element={ <IsPrivate><UserProfilePage /></IsPrivate>} />
          <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
          <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
          <Route path="/taskManager" element={<IsPrivate><TaskManagerPage /></IsPrivate>}/>

        </Routes>
     </>
  );
}

export default App;

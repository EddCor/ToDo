import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";


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

   
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response)
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };


  return (
    <div className="CohortCreatePage p-8 pb-16 mb-10 mt-10 rounded-lg shadow-md flex flex-col h-full relative w-full max-w-3xl mx-auto">
      <div className="flex justify-center bg-white items-center mb-4 pt-8 absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-b border-gray-300 shadow-sm"></div>

      <form
        onSubmit={handleSignupSubmit}
        className="grid grid-cols-1 gap-4 overflow-y-auto mt-12 px-4"
      >
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 sticky left-0">
          Sign Up
        </h3>

        <label
          htmlFor="username"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Username
        </label>
        <input
          type="username"
          name="username"
          id="username"
          value={username}
          onChange={handleUsername}
          className="border rounded p-2 w-full mb-6"
          autoComplete="off"
        />

        <label
          htmlFor="passwordHash"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
          className="border rounded p-2 w-full mb-6"
          autoComplete="off"
        />

        <label
          htmlFor="name"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Fullname
        </label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          value={fullname}
          onChange={handleFullname}
          className="border rounded p-2 w-full mb-6"
          autoComplete="off"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-150 ease-in-out"
        >
          Create Account
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="mt-10 mb-2">Already have an account?</p>
      <Link to={"/login"}> Log in</Link>
    </div>
  )
}

export default SignupPage;
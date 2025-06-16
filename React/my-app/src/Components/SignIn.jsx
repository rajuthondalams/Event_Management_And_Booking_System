import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";  // Import the AppContext
import { FaEye, FaEyeSlash } from "react-icons/fa";  // Import the eye icons from react-icons/fa
import "./SignIn.css";
import axios from "axios";

const SignIn = () => {
  // State for form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // Track password visibility
  const { updateUsername, updateRole, updateUserId } = useContext(AppContext); // Access context functions
  const navigate = useNavigate(); // For redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation logic
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        username: username,
        password: password,
      },
      {
        headers: { "Content-Type": "application/json" }, // Ensure JSON format
      });
      if (response.data.success) {
        updateUsername(response.data.firstname  );
        updateRole(response.data.role);
        updateUserId(response.data.id);
      }
      else{
        alert("Invalid username or password");
      }
      if(response.data.role === "user"){
        navigate("/"); // Navigate to the home page for user
      }
      if(response.data.role === "admin"){
        navigate("/adminhome"); // Navigate to the admin home page
      }
    }catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid username or password"); // Handle invalid credentials
      } else {
        console.error("Error during login:", error);
        alert("An error occurred while logging in.");
      }
    }
  };

  return (
    <div className="signin-container">
      <div className="container-fluid">
        <form onSubmit={handleSubmit}>
          <h1 >Sign In</h1>
          <div>
            <label htmlFor="" className="">USERNAME</label><br />
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update username state
              placeholder="Username"
            />
          </div>
          <div>
            <label htmlFor="">PASSWORD</label><br />
            <div className="password-input-container">
              <input
                type={passwordVisible ? "text" : "password"} // Show password if visible
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                placeholder="Password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                aria-label={passwordVisible ? "Hide password" : "Show password"} // Accessibility: label for screen readers
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Toggle between eye icons */}
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit">Sign In</button>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-start">
              <NavLink
                to="ResetPassword"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Reset password
              </NavLink>
            </div>
            {/* <div className="col d-flex justify-content-end text-end">
              <NavLink
                to="ForgotPassword"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Forgot password
              </NavLink>
            </div> */}
          </div> 
          <div className="d-flex justify-content-center mt-3">
            <NavLink
              to="/Register"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              <h5>New user register here</h5>
            </NavLink>
          </div>
          <div className="d-flex justify-content-center">
            <i className="bi bi-hand-index" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
 
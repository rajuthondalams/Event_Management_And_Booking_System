import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavigationBar.css";
import { AppContext } from "./AppContext";
import Profile from "./Profile";

const NavigationBar = () => {
  const [modal, setModal] = useState(false);
  const { username, role, logout } = useContext(AppContext); // Access both username and role from context

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleLogout = () => {
    logout(); // Call logout function to reset username and role
    setModal(false); // Close modal after logout
  };

  return (
    <div className="NavigationBar-container">
      <div className="container-fluid mb-5 mt-4">
        <div className="row d-flex justify-content-between align-items-center">
          {/* Left-aligned navigation links */}
          <div className="col d-flex justify-content-start">
            <div className="me-4 ps-4">
              <NavLink to="/" className="nav-link btn-modal">
                <i className="bi bi-house"></i> Home
              </NavLink>
            </div>
            <div className="me-4">
              <NavLink to="/Instruction" className="nav-link">
                <i className="bi bi-info-circle"></i> Instructions
              </NavLink>
            </div>
            <div className="me-4">
              <NavLink to="/About" className="nav-link">
                <i className="bi bi-people"></i> About
              </NavLink>
            </div>
            <div className="me-4">
              <NavLink to="/ContactUs" className="nav-link">
                <i className="bi bi-envelope"></i> Contact
              </NavLink>
            </div>
            {/* Conditionally render "My Booking" based on role */}
            {role === "user" && (
              <div className="me-4">
                <NavLink to="/MyBooking" className="nav-link">
                  <i className="bi bi-bookmark"></i> My Booking
                </NavLink>
              </div>
            )}
          </div>

          {/* Right-aligned Profile component */}
          <div className="col d-flex justify-content-end">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;

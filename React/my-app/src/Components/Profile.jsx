import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import { Modal, Button } from "react-bootstrap";
import "./Profile.css";

const Profile = () => {
  const [modal, setModal] = useState(false);
  const { username, role, logout } = useContext(AppContext);
  const navigate = useNavigate();
  
  // Ref for the modal content
  const modalRef = useRef(null);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleLogout = () => {
    logout();
    setModal(false);
  };

  const handleSettings = () => {
    setModal(false);
    navigate("/UserHome");
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(false);
      }
    };

    // Adding event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal]);

  return (
    <div className="col-3 d-flex align-items-center justify-content-end order-last mr-2">
      <div className="position-relative">
        <NavLink
          to="#"
          className="nav-link d-flex align-items-center profile-navlink"
          onClick={(e) => {
            e.preventDefault();
            toggleModal();
          }}
        >
          <i className="bi bi-person profile-icon"></i>
          <span className="profile-username">
            {username === null ? "Profile" : username}
          </span>
        </NavLink>

        {modal && (
          <div className="profile-modal" ref={modalRef}>
            <button
              type="button"
              className="profile-close-btn"
              aria-label="Close"
              onClick={toggleModal}
            >
              <span>&times;</span>
            </button>

            <ul className="list-unstyled mb-0">
              <li>
                <i className="bi bi-person-square profile-icon"></i>
                <span className="profile-username">{username || "Profile"}</span>
              </li>

              {role === null || role === "none" ? (
                <li>
                  <NavLink to="/Login" className="modal-link" onClick={toggleModal}>
                    LogIn
                  </NavLink>
                </li>
              ) : (
                <div>
                  {role === "user" && (
                    <li>
                      <NavLink to="/UserHome" className="modal-link" onClick={toggleModal}>
                        Settings
                      </NavLink>
                    </li>
                  )}
                </div>
              )}

              {role !== null && role !== "none" && (
                <li>
                  <NavLink to="/" className="modal-link" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right profile-icon"></i> Log Out
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

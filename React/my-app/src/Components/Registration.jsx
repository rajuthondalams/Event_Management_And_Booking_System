import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Registration = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState(""); // Updated from email
  const [mobile, setMobile] = useState("");
  const [newpass, setNewPass] = useState("");
  const [connewpass, setConNewPass] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [role, setRole] = useState(state?.role || "");

  useEffect(() => {
    if (!role) {
      alert("Role not defined. Please navigate through the Register page first.");
    }
  }, [role]);

  const handlePassword = async (event) => {
    event.preventDefault();
    if (newpass !== connewpass) {
      alert("Both passwords should match!");
      return;
    }

    const userData = {
      firstName,
      lastName,
      username, // Changed from email
      mobile,
      password: newpass,
      role:role.toUpperCase(),
    };
    console.log(userData);
    try {
      const response = await axios.post("http://localhost:3000/users/register", userData);
      alert("Registration successful!");
      console.log("Response:", response.data);
      navigate('/login');
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container mb-5 d-flex justify-content-center align-items-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <form className="needs-validation" noValidate onSubmit={handlePassword}>
              <div className="row text-start">
                <div className="col-md-6 mb-3">
                  <label htmlFor="fname">First name</label>
                  <input type="text" className="form-control" id="fname" placeholder="First name" required onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lname">Last name</label>
                  <input type="text" className="form-control" id="lname" placeholder="Last name" required onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="username">Email (Username)</label>
                  <input type="email" className="form-control" id="username" placeholder="Enter your email" required onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="mob-no">Mobile Number</label>
                  <input type="text" className="form-control" id="mob-no" placeholder="Mobile Number" pattern="^[0-9]{10}$" maxLength={10} required onChange={(e) => setMobile(e.target.value)} />
                  <div className="invalid-feedback">Please enter a valid 10-digit mobile number.</div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="pass">Password</label>
                  <div className="password-input-container">
                    <input type={passwordVisible ? "text" : "password"} className="form-control" id="pass" onChange={(e) => setNewPass(e.target.value)} placeholder="Password" required />
                    <button type="button" className="password-toggle-btn" onClick={() => setPasswordVisible(!passwordVisible)}>
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cpass">Confirm Password</label>
                  <div className="password-input-container">
                    <input type={confirmPasswordVisible ? "text" : "password"} className="form-control" id="cpass" onChange={(e) => setConNewPass(e.target.value)} placeholder="Confirm Password" required />
                    <button type="button" className="password-toggle-btn" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                      {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
              <input type="hidden" name="role" value={role} />
              <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-primary" type="submit">Submit form</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;

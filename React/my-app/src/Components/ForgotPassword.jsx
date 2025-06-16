import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // Import the eye icons
import "./ForgotPassword.css";

const ForgotPassword = () => {
    let [otpSent, setOtpSent] = useState(false);
    let [otpVerified, setOtpVerified] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const otpHandler = (e) => {
        e.preventDefault(); // Prevent form submission
        const enteredOtp = document.getElementById("otp").value; // Get the entered OTP
        if (enteredOtp === "1234") {
            setOtpVerified(true);
        } else {
            alert("Invalid OTP. Please try again.");
        }
    };

    let formContext;
    if (!otpSent) {
        formContext = (
            <form action="">
                <h1>Forgot Password</h1>
                <div>
                    <label htmlFor="">USERNAME</label>
                    <input type="text" name="" id="" placeholder="Username" />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" onClick={() => setOtpSent(true)}>
                        Send OTP
                    </button>
                </div>
            </form>
        );
    } else {
        formContext = (
            <form action="">
                <h1 className="mb-2">Verify OTP</h1>
                <div>
                    <label htmlFor="">Enter the OTP</label>
                    <input type="text" name="" id="otp" pattern="\d{4}" />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" onClick={otpHandler}>
                        Verify
                    </button>
                </div>
            </form>
        );
    }

    if (otpVerified) {
        formContext = (
            <form action="">
                <h2>Change Password</h2>
                <div>
                    <label htmlFor="">New Password</label>
                    <div className="password-input-container">
                        <input
                            type={newPasswordVisible ? "text" : "password"}
                            name=""
                            id=""
                            placeholder="Enter New Password"
                        />
                        <button
                            type="button"
                            className="password-toggle-btn"
                            onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                            aria-label={newPasswordVisible ? "Hide password" : "Show password"}
                        >
                            {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="">Confirm Password</label>
                    <div className="password-input-container">
                        <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            name=""
                            id=""
                            placeholder="Re-Enter the same password"
                        />
                        <button
                            type="button"
                            className="password-toggle-btn"
                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                            aria-label={confirmPasswordVisible ? "Hide password" : "Show password"}
                        >
                            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <NavLink to="/Login" className="nav-link" activeClassName="active">
                        Change
                    </NavLink>
                </div>
            </form>
        );
    }

    return (
        <div className="fpassword-container">
            <div className="container-fluid">
                {formContext}
            </div>
        </div>
    );
};

export default ForgotPassword;

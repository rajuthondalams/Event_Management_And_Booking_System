import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // Import the eye icons
import axios from "axios";  // Import axios for API calls
import "./ResetPassword.css";
import { AppContext } from './AppContext';

const ResetPassword = () => {
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const [username, setUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { logout } = useContext(AppContext);

    const navigate = useNavigate();  // For redirecting to login page

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation: check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");  // Clear any previous errors
        setLoading(true);

        try {
            // Step 1: Send username, current password, and new password to the backend
            const response = await axios.post("http://localhost:3000/users/resetPassword", {
                username,
                currentPassword,
                newPassword
            });

            if (response.data.success) {
                // If the response indicates success, show success message and redirect to login page
                alert(response.data.message);  // Display success message
                logout();
                navigate("/Login");  // Redirect to login page
            } else {
                // If the credentials are invalid, display error message
                setError(response.data.message);
            }
        } catch (error) {
            console.error("Error during password reset:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="resetPassword-container">
            <div className="container-fluid">
                <form onSubmit={handleSubmit}>
                    <h1>Reset Password</h1>

                    {/* Username input */}
                    <div>
                        <label htmlFor="">USERNAME</label><br />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Current Password input */}
                    <div>
                        <label htmlFor="">CURRENT PASSWORD</label>
                        <div className="password-input-container">
                            <input
                                type={currentPasswordVisible ? "text" : "password"}
                                placeholder="Enter your Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)}
                                aria-label={currentPasswordVisible ? "Hide password" : "Show password"}
                            >
                                {currentPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* New Password input */}
                    <div>
                        <label htmlFor="">NEW PASSWORD</label>
                        <div className="password-input-container">
                            <input
                                type={newPasswordVisible ? "text" : "password"}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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

                    {/* Confirm Password input */}
                    <div>
                        <label htmlFor="">CONFIRM PASSWORD</label>
                        <div className="password-input-container">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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

                    {/* Display error message if any */}
                    {error && <p className="error-message">{error}</p>}

                    {/* Submit button */}
                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Loading..." : "Reset Password"}
                        </button>
                    </div>

                    {/* Link to Login page */}
                    <div className="d-flex justify-content-center mt-2">
                        <NavLink to="/Login" className="nav-link">
                            Back to Login
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;

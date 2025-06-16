import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from './AppContext';
import './UserHome.css';

const UserHome = () => {
    const { userId } = useContext(AppContext); // Get userId from context
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        mobile: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    // Fetch user details from backend
    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:3000/users/${userId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.error("Error fetching user:", data.error);
                    } else {
                        setUserData(data);
                    }
                })
                .catch(error => console.error("Error:", error));
        }
    }, [userId]);

    // Handle input change
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Handle save/update
    const handleSave = () => {
        fetch(`http://localhost:3000/users/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message || "User updated successfully");
                setIsEditing(false);
            })
            .catch(error => console.error("Error updating user:", error));
    };

    return (
        <div className="user-container">
            <div className="card">
                <h2>Welcome, {userData.username || "Guest"}!</h2>
                <div className="text-start">
                    <h3>Your details:</h3>
                </div>
                <div className="text-end">
                    <button className="btn btn-secondary" onClick={() => setIsEditing(!isEditing)}>Edit</button>
                </div>

                <div className="row mt-3">
                    <div className="col"><p><strong>First name:</strong></p></div>
                    <div className="col">
                        <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} disabled={!isEditing} />
                    </div>
                    <div className="col"><p><strong>Last name:</strong></p></div>
                    <div className="col">
                        <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} disabled={!isEditing} />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col"><p><strong>Username:</strong></p></div>
                    <div className="col">
                        <input type="text" name="username" value={userData.username} disabled />
                    </div>
                    <div className="col"><p><strong>Mobile number:</strong></p></div>
                    <div className="col">
                        <input type="text" name="mobile" value={userData.mobile} onChange={handleChange} disabled={!isEditing} />
                    </div>
                </div>

                {!isEditing && (
                <div className="col d-flex align-items-center">
                    <NavLink
                        to="/Login/ResetPassword"
                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                        style={{ padding: "8px 12px", fontSize: "16px" }} // Optional custom styling
                    >
                        Reset Password
                    </NavLink>
                </div>
                )}


                {isEditing && (
                    <div className="text-center mt-5">
                        <button className="btn btn-primary" onClick={handleSave}>Save</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserHome;

import React from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';

const Register = () => {
    const navigate = useNavigate();

    const handleRegistration = (role) => {
        // Send the role as state to the Registration page
        navigate('/Registration', { state: { role } });
    };

    return (
        <div className="register-container">
            <div className="container-fluid card">
                <div className="row">
                    <div className="d-flex justify-content-end">
                        Welcome to our event management platform!
                        Whether you're planning a wedding, corporate meeting, or any other special event,
                        we're here to make it a memorable experience.
                    </div>
                    <div className="ps-3">
                        <u>
                            <button 
                                type="button" 
                                className="nav-link d-inline btn-link" 
                                onClick={() => handleRegistration("user")}
                            >
                                Click here
                            </button>
                        </u> 
                        or the link below to register as a user, and start your journey towards organizing the perfect event. 
                        With our user-friendly platform, you'll have everything you need to plan and execute your event with ease.
                        We look forward to helping you create unforgettable moments!
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button 
                            type="button" 
                            className="nav-link" 
                            onClick={() => handleRegistration("user")}
                        >
                            Register
                        </button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <i className="bi bi-hand-index"></i>
                    </div>
                    <div className="d-flex justify-content-end pt-3">
                        As a venue manager, your role is crucial in creating memorable events.
                    </div>
                    <div className="ps-3">
                        Provide us with your details, and we'll connect you to more people looking for the perfect venue for their events.
                        By registering 
                        <u>
                            <button 
                                type="button" 
                                className="nav-link d-inline btn-link" 
                                onClick={() => handleRegistration("admin")}
                            >
                                here
                            </button>
                        </u> 
                        or from the below to register as a Manager, you'll expand your reach and have the opportunity to showcase your venue 
                        to numerous clients eager to create unforgettable experiences. Join our platform to grow your business and be part of a 
                        network that connects event organizers and venue managers seamlessly!
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button 
                            type="button" 
                            className="nav-link" 
                            onClick={() => handleRegistration("admin")}
                        >
                            Register
                        </button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <i className="bi bi-hand-index"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
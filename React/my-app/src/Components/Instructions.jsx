import React from "react";
import { useNavigate } from "react-router-dom";
import "./Instructions.css";

const Instructions = () => {
  const navigate = useNavigate();

  return (
    <div className="instructions-container">
      <div className="instructions-box">
        <h1>Welcome to Event Planning and Booking System</h1>

        <h2>New User? Register First!</h2>
        <p>
          If you are a new user, please{" "}
          <span className="link" onClick={() => navigate("/Register")}>
            click here to register
          </span>
          . This will take you to the Registration page, where you can create an account.
        </p>

        <h2>Login to Continue</h2>
        <p>
          Once registered, go to the Login page by clicking{" "}
          <span className="link" onClick={() => navigate("/Login")}>Login</span>, then enter your credentials.
        </p>

        <h2>For Customers</h2>
        <ul>
          <li>Click <b>"Book Now"</b> to start booking on the Home Page.</li>
          <li>Select a <b>State</b> to get the list of Function Halls on the Booking Page.</li>
          <li>View the list of Function Halls on the Booking Page.</li>
          <li>Click <b>"View Details"</b> on the Booking Page to see more information about a Function Hall.</li>
          <li>See the <b>Function Hall details</b> on the Function Hall Page.</li>
          <li>Click <b>"Book Now"</b> to proceed with your booking on the Function Hall Page.</li>
          <li>Fill in your booking details and confirm by clicking <b>"Book Now"</b> on the Confirm Booking Page.</li>
          <li>Track your bookings under <b>"My Bookings"</b> on the My Bookings Page.</li>
        </ul>

        <h2>For Admins</h2>
        <ul>
          <li>When logged in as an <b>admin</b>, you will be redirected to the <b>Admin Dashboard</b>.</li>
          <li>You can:
            <ul>
              <li>Add Function Halls</li>
              <li>Edit Function Hall Details</li>
              <li>Delete Function Halls</li>
              <li>Accept or Reject Booking Requests</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Instructions;

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { AppContext } from "./AppContext";

const ConfirmBooking = () => {
    const { userId, functionHallId, setFunctionHallId } = useContext(AppContext);
    const navigate = useNavigate();
    const [bookingData, setBookingData] = useState({});
    const [guests, setGuests] = useState("");
    const [date, setDate] = useState("");
    const [eventType, setEventType] = useState("");
    
    useEffect(() => {
        if (!functionHallId || functionHallId === 0) {
            alert("Invalid Function Hall ID. Please try again.");
            return;
        }

        const fetchFunctionHallDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/functionhalls/${functionHallId}/details`);
                const data = await response.json();
                console.log("Function Hall Details:", data); // For debugging
                setBookingData(data);
            } catch (error) {
                console.error("Error fetching function hall details:", error);
            }
        };
        
        fetchFunctionHallDetails();
    }, [functionHallId]);

    const handleBooking = async () => {
        if (!userId || !functionHallId || !guests || !date || !eventType) {
            alert("All fields are required!");
            return;
        }

        try {
            const bookingPayload = {
                userId: Number(userId), // Ensure userId is converted to a number
                functionHallId: Number(functionHallId), // Ensure functionHallId is converted to a number
                expectedGuests: parseInt(guests, 10), // Ensure guests is converted to a number
                date: date, // Ensure date is in 'yyyy-MM-dd' format
                eventType: eventType, // Ensure eventType is a string
                bookingStatus: "PENDING" // Default booking status
            };

            const response = await axios.post("http://localhost:3000/api/bookings/create", bookingPayload);
            alert("Booking successful!");
            navigate("/MyBooking");
        } catch (error) {
            console.error("Error creating booking:", error);
            alert("Booking failed. Please try again.");
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h2><b>Confirm Booking</b></h2><br />
                    <h4 className="card-title">Booking Details</h4>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td><strong>Function Hall Name:</strong></td>
                                <td>{bookingData.name || "Loading..."}</td>
                            </tr>
                            <tr>
                                <td><strong>State:</strong></td>
                                <td>{bookingData.state || "Loading..."}</td>
                            </tr>
                            <tr>
                                <td><strong>Location:</strong></td>
                                <td>{bookingData.location || "Loading..."}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />

                    <p><strong>Enter your requirements</strong></p>
                    <div className="row g-3">
                        <div className="col-md-4">
                            <label htmlFor="guests" className="form-label">Number of Guests:</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                id="guests" 
                                min="1" 
                                required 
                                value={guests} 
                                onChange={(e) => setGuests(e.target.value)} 
                            />
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="date" className="form-label">Date:</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="date" 
                                required 
                                value={date} 
                                onChange={(e) => setDate(e.target.value)} 
                            />
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="eventType" className="form-label">Event Type:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="eventType" 
                                required 
                                value={eventType} 
                                onChange={(e) => setEventType(e.target.value)} 
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ width: "auto", padding: "5px 10px", whiteSpace: "nowrap" }}
                        onClick={handleBooking}
                    >
                        Book Now
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ConfirmBooking;

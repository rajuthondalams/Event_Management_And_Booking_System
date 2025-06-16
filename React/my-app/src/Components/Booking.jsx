import React, { useState, useContext } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Booking = () => {
  const [selectedState, setSelectedState] = useState("");
  const [functionHalls, setFunctionHalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { username, stateList, updateFunctionHallId } = useContext(AppContext);
  const navigate = useNavigate();

  const fetchFunctionHalls = (state) => {
    if (state && state !== "--Select State--") {
      setLoading(true);
      fetch(`http://localhost:3000/api/functionhalls/state/${state}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setFunctionHalls(data || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching function halls:", error);
          setError("Failed to fetch function halls. Please try again later.");
          setLoading(false);
        });
    } else {
      setFunctionHalls([]);
    }
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    fetchFunctionHalls(event.target.value);
  };

  const handleViewDetails = (hall) => {
    const functionHallId = Number(hall.id); // Ensure it's a number
    updateFunctionHallId(functionHallId); // Store in AppContext
    navigate("/FunctionHall");
  };

  return (
    <div className="booking-container">
      <div className="container-fluid">
        <div className="card">
          <p>Welcome, <b>{username}</b>! Select a state to view available function halls.</p>
          <div className="state-drop">
            <select value={selectedState} onChange={handleStateChange} className="form-select">
              <option value="--Select State--">--Select State--</option>
              {stateList.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>
          {loading && <p>Loading function halls...</p>}
          {error && <p className="error-text">{error}</p>}
          {!loading && functionHalls.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>State</th>
                  <th>Function Hall</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {functionHalls.map((hall) => (
                  <tr key={hall.id}>
                    <td>{selectedState}</td>
                    <td>{hall.name}</td>
                    <td>{hall.location}</td>
                    <td>
                      <button onClick={() => handleViewDetails(hall)} className="btn btn-primary">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && functionHalls.length === 0 && selectedState && selectedState !== "--Select State--" && (
            <p>No function halls found for {selectedState}.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;

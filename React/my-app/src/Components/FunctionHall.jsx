import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const FunctionHall = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { functionHallId, role, stateList } = useContext(AppContext);
  const [hallDetails, setHallDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    setFormData({ ...formData, state: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Fetch function hall details
  const fetchFunctionHallDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/functionhalls/${functionHallId}/details`);

      if (!response.ok) {
        throw new Error(`Error fetching details: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Function Hall Details:", data);
      setHallDetails(data);
      setFormData(data); // Populate form data for editing
    } catch (err) {
      console.error("Error fetching function hall details:", err);
      setError("Failed to fetch hall details.");
    }
    setLoading(false);
  };

  // Fetch details on mount
  useEffect(() => {
    if (!functionHallId) {
      setError("Invalid function hall ID.");
      setLoading(false);
      return;
    }
    fetchFunctionHallDetails();
  }, [functionHallId]);

  // Handle Save Function
  const handleSave = async () => {
    const updatedData = {
      hallId: parseInt(formData.hallId, 10) || functionHallId,
      hallName: formData.name,
      location: formData.location,
      state: formData.state,
      admin: {
        id: parseInt(formData.adminId, 10) || null,
        name: formData.adminName,
        contact: formData.adminContact,
      },
    };

    console.log("Updating with data:", updatedData);

    try {
      const response = await fetch(`http://localhost:3000/api/functionhalls/update`, {
        method: "POST", // Changed from POST to PUT for updates
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const contentType = response.headers.get("content-type");
      let responseData = contentType && contentType.includes("application/json") ? await response.json() : {};

      console.log("API Response:", responseData);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText} - ${JSON.stringify(responseData)}`);
      }

      if (responseData.error) {
        setError(responseData.error);
      } else {
        fetchFunctionHallDetails(); // Refresh details
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Error saving data. Please check logs for details.");
    }
  };

  // Handle Booking Function
  const handleBookNow = async () => {
    try {
      console.log("Fetching latest hall details before booking...");
      const response = await fetch(`http://localhost:3000/api/functionhalls/${functionHallId}/details`);
      const data = await response.json();

      if (!response.ok || !data || Object.keys(data).length === 0) {
        console.error("Failed to fetch valid function hall details, cannot proceed.");
        return;
      }

      console.log("Navigating with updated hallDetails:", data);
      navigate("/ConfirmBooking", { state: data, functionHallId: functionHallId });
    } catch (error) {
      console.error("Error fetching function hall details:", error);
    }
  };

  return (
    <div className="container FunctionHall-container">
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {hallDetails && (
        <div className="card text-start">
          <h2 className="text-center mb-5">Function Hall Details</h2>

          <form>
            <table className="table">
              <tbody>
                <tr>
                  <td><strong>State:</strong></td>
                  <td>
                    {isEditing ? (
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleStateChange}
                        className="form-select"
                      >
                        <option value="">--Select State--</option>
                        {stateList.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        id="state"
                        className="form-control"
                        name="state"
                        value={formData.state || "Not Available"}
                        disabled
                      />
                    )}
                  </td>
                </tr>

                <tr>
                  <td><strong>Function Hall Name:</strong></td>
                  <td>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </td>
                  <td>
                    <div className="col text-end">
                      {role === "user" ? (
                        <button className="btn btn-primary" type="button" onClick={handleBookNow}>
                          Book Now
                        </button>
                      ) : role === "admin" ? (
                        <button className="btn btn-secondary" onClick={handleEdit} type="button">
                          Edit
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td><strong>Location:</strong></td>
                  <td>
                    <input
                      type="text"
                      id="location"
                      className="form-control"
                      name="location"
                      value={formData.location || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </td>
                </tr>

                <tr>
                  <td><strong>Manager Name:</strong></td>
                  <td>
                    <input
                      type="text"
                      id="adminName"
                      className="form-control"
                      name="adminName"
                      value={formData.adminName || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </td>
                </tr>

                <tr>
                  <td><strong>Manager Contact:</strong></td>
                  <td>
                    <input
                      type="text"
                      id="adminContact"
                      className="form-control"
                      name="adminContact"
                      value={formData.adminContact || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </td>
                </tr>

                {isEditing && (
                  <tr>
                    <td></td>
                    <td>
                      <button className="btn btn-success ms-2" onClick={handleSave} type="button">
                        Save
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </form>
        </div>
      )}
    </div>
  );
};

export default FunctionHall;
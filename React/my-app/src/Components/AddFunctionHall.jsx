import React, { useState, useContext } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddFunctionHall = ({ setActiveView }) => {
    const { stateList, userId } = useContext(AppContext);
    const [formData, setFormData] = useState({
        hallName: "",
        location: "",
        state: "", // Send state name instead of ID
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const dataToSend = {
            hallName: formData.hallName,
            location: formData.location,
            state: formData.state, // Send state as string
            admin: { id: userId },
        };

        try {
            const response = await axios.post(
                "http://localhost:3000/api/functionhalls/add",
                dataToSend
            );

            console.log("Function hall added:", response.data);

            if (response.status === 200 || response.status === 201) {
                setFormData({ hallName: "", location: "", state: "" });
                setActiveView("details");
            } else {
                setError(`Unexpected response: ${response.status} - ${response.data}`);
            }
        } catch (err) {
            console.error("Error adding function hall:", err.response);
            setError(
                err.response?.data?.message ||
                "Error adding function hall. Please check your input and try again."
            );
        }
    };

    return (
        <div className="container">
            <h2>Add Function Hall</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Function Hall Name</td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="hallName"
                                    value={formData.hallName}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>State</td>
                            <td>
                                <select
                                    className="form-control"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">--Select State--</option>
                                    {stateList.map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Location</td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary me-2">
                        Add
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => setActiveView("details")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddFunctionHall;
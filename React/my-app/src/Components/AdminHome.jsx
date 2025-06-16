import React, { useState, useEffect, useContext } from "react";
import "./AdminHome.css";
import Profile from "./Profile";
import { AppContext } from "./AppContext"; // Import AppContext
import FunctionHall from "./FunctionHall"; // Assuming you have a FunctionHall component
import axios from "axios"; // Import axios for making HTTP requests
import AddFunctionHall from './AddFunctionHall';
import UserHome from './UserHome';

const AdminHome = ({ setView }) => {
  const { userId, username, updateFunctionHallId, functionHallId } = useContext(AppContext); // Get username and functionHallId from context
  const [activeView, setActiveView] = useState("dashboard");
  const [functionHalls, setFunctionHalls] = useState([]);
  const [selectedState, setSelectedState] = useState("");// Assuming you want to keep it static for now
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [hallToDelete, setHallToDelete] = useState(null);
  const [inquiries, setInquiries] = useState([]); // To store fetched inquiries
  const [loading, setLoading] = useState(true); // Loading state
  const [bookedApplicants, setBookedApplicants] = useState([]);



  // Fetch function halls data from backend (port 3000)
  useEffect(() => {
    const fetchFunctionHalls = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/functionhalls/admin/${userId}`);
        setFunctionHalls(response.data);
      } catch (error) {
        console.error("Error fetching function halls:", error);
      }
    };

    fetchFunctionHalls();
  }, [selectedState]); // Run every time selectedState changes

  useEffect(() => {
    if (activeView === "inquiries") {
      const fetchInquiries = async () => {
        try {
          const response = await axios.get("http://localhost:3000/booking/inquiries");
          setInquiries(response.data);
          setLoading(false); // Set loading to false once data is fetched
        } catch (error) {
          console.error("Error fetching inquiries:", error);
        }
      };

      fetchInquiries();
    }
  }, [activeView]); // Fetch data only when "inquiries" view is active

  const handleAcceptBooking = async (bookingId) => {
    try {
      // Send request to the backend to accept the booking
      await axios.post(`http://localhost:3000/booking/response`, {
        bookingId,
        response: "accept", // Booking status is "ACCEPTED"
      });

      // Fetch the updated list of booked applicants
      const response = await axios.get("http://localhost:3000/booking/accepted");
      setBookedApplicants(response.data);
    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };

  useEffect(() => {
    const fetchBookedApplicants = async () => {
      try {
        const response = await axios.get("http://localhost:3000/booking/accepted");
        setBookedApplicants(response.data);
      } catch (error) {
        console.error("Error fetching booked applicants:", error);
      }
    };

    if (activeView === "bookings") {
      fetchBookedApplicants();
    }
  }, [activeView]);

  const handleResponse = async (bookingId, response) => {
    try {
      await axios.post(`http://localhost:3000/booking/response`, {
        bookingId,
        response, // Either 'accept' or 'reject'
      });
      setInquiries(inquiries.filter((inquiry) => inquiry.bookingId !== bookingId)); // Remove the inquiry from the list after response
    } catch (error) {
      console.error("Error sending response:", error);
    }
  };

  const handleViewDetails = (hallId) => {
    updateFunctionHallId(Number(hallId)); // Ensure ID is sent as a number
    setActiveView("viewDetails"); // Switch to FunctionHall view
  };

  const handleDelete = (hallId) => {
    setHallToDelete(hallId);
    setIsDeleteModalOpen(true);
  };

  const handleAddFunctionHall = () => {
    updateFunctionHallId(null); // Ensure no hallId is set for a new function hall
    setActiveView("addFunctionHall"); // Switch to the "Add Function Hall" view
  };
  const handleMydetails = () =>{
    setActiveView("myDetails");
  }

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/functionhalls/${hallToDelete}`);
      setFunctionHalls(functionHalls.filter((hall) => hall.id !== hallToDelete));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting function hall:", error);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="app row">
      {/* Sidebar */}
      <div className="sidebar col-2">
        <h2>Control Panel</h2>
        <ul>
          <li onClick={() => setActiveView("dashboard")}>
            <i className="fas fa-home"></i> Dashboard
          </li>
          <li onClick={() => setActiveView("inquiries")}>
            <i className="fas fa-envelope"></i> Inquiries
          </li>
          <li onClick={() => setActiveView("bookings")}>
            <i className="fas fa-calendar-check"></i> Booked Applicants
          </li>
          <li onClick={() => setActiveView("details")}>
            <i className="fas fa-concierge-bell"></i> Details
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="col-10 main-content">
        <div className="navbar">
          <div className="navbar-left">
            <h4 className="username-display">Welcome, {username}</h4>
          </div>
          <div className="navbar-right">
            <Profile />
          </div>
        </div>
        <hr />

        <div className="main">
          {/* Dashboard View */}
          {activeView === "dashboard" && (
            <div>
              <div className="row">
                <div className="col-3 card clickable-card" onClick={() => setActiveView("details")}>
                  <div className="card-content">
                    <div className="icon-number-container">
                      <h5>{functionHalls.length}</h5>
                    </div>
                    <p>Active Location</p>
                  </div>
                </div>
                <div className="col-3 card">
                  <div className="card-content">
                    <h5>{inquiries.length}</h5> {/* Display the size of the inquiries list */}
                    <p>Bookings</p>
                  </div>
                </div>

                <div className="col-3 card">
                  <div className="card-content">
                    <h5>{bookedApplicants.length}</h5> {/* Display the count of booked applicants */}
                    <p>Confirmed</p> {/* Text below the count */}
                  </div>
                </div>

                <div className=" col-3 card" onClick={() => { setActiveView("addFunctionHall"); updateFunctionHallId(null); }}>
                  {/* <div className="card-body text-center"> */}
                  <i className="fas fa-plus-circle fa-3x"></i> {/* Font Awesome Plus Icon */}
                  <p className="card-title">Add New Function Hall</p>
                  {/* </div> */}
                </div>

              </div>

              <div className="row mt-4">
                <h4>Function Halls</h4>
                {functionHalls.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>State</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {functionHalls.map((hall) => (
                        <tr key={hall.id}>
                          <td>{hall.state}</td>
                          <td>{hall.name}</td>
                          <td>{hall.location}</td>
                          <td>
                            <button
                              onClick={() => handleViewDetails(hall.id)}
                              className="btn btn-primary"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Click on <b>Details</b> to enter your function hall details.</p>
                )}
              </div>
            </div>
          )}

          {/* Details View */}
          {activeView === "details" && (
            <div>
              <button className="btn btn-success" onClick={() => { handleAddFunctionHall(true); }}>
                + Add Function Hall
              </button>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}> {/* Flexbox container */}
                <button className="btn btn-secondary" onClick={() => {handleMydetails(true);}}>
                  <i className="fas fa-cog"></i> My details
                </button>
              </div>
              <h4 className="mt-4">Function Halls</h4>
              {functionHalls.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>State</th>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {functionHalls.map((hall) => (
                      <tr key={hall.id}>
                        <td>{hall.state}</td>
                        <td>{hall.name}</td>
                        <td>{hall.location}</td>
                        <td>
                          <button
                            onClick={() => handleViewDetails(hall.id)}
                            className="btn btn-primary"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleDelete(hall.id)}
                            className="btn btn-danger ml-2"
                          >
                            <i className="fas fa-trash-alt"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>
                  No function halls found. Click on <b>+ Add Function Hall</b> to add your function hall details.
                </p>
              )}
            </div>
          )}

          {activeView === "inquiries" && (
            <div>
              <h4>Inquiries</h4>
              {loading ? (
                <p>Loading inquiries...</p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>User Name</th>
                      <th>Date</th>
                      <th>Function Hall Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inquiry) => (
                      <tr key={inquiry.bookingId}>
                        <td>{inquiry.bookingId}</td>
                        <td>{inquiry.username}</td>
                        <td>{inquiry.date}</td>
                        <td>{inquiry.functionHallName}</td>
                        <td>
                          <button
                            onClick={() => handleViewDetails(inquiry.bookingId)}
                            className="btn btn-primary"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleResponse(inquiry.bookingId, "accept")}
                            className="btn btn-success ml-2"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleResponse(inquiry.bookingId, "reject")}
                            className="btn btn-danger ml-2"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeView === "bookings" && (
            <div>
              <h4>Booked Applicants</h4>
              {bookedApplicants.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>User Name</th>
                      <th>Date</th>
                      <th>Function Hall Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookedApplicants.map((applicant) => (
                      <tr key={applicant.bookingId}>
                        <td>{applicant.bookingId}</td>
                        <td>{applicant.username}</td>
                        <td>{applicant.date}</td>
                        <td>{applicant.functionHallName}</td>
                        <td>
                          <button
                            onClick={() => handleAcceptBooking(applicant.bookingId)}
                            className="btn btn-success"
                          >
                            Accept
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No booked applicants found.</p>
              )}
            </div>
          )}


          {/* Function Hall View */}
          {activeView === "viewDetails" && functionHallId !== null && (
            <FunctionHall hallId={functionHallId} />
          )}

          {activeView === "addFunctionHall" && <AddFunctionHall setActiveView={setActiveView} />}
          {activeView === "myDetails" && <UserHome setActiveView={setActiveView} />}


          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h4>Confirm Deletion</h4>
                <p>Are you sure you want to delete this function hall?</p>
                <button onClick={confirmDelete} className="btn btn-danger">
                  Yes, Delete
                </button>
                <button onClick={cancelDelete} className="btn btn-secondary ml-2">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default AdminHome;
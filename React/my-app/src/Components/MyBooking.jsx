import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext'; // Assuming the AppContext is in the same directory
import './MyBooking.css'; // Keep your custom CSS file

const MyBooking = () => {
  const { userId } = useContext(AppContext); // Get the userId from context
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      // Fetch the booking details for the logged-in user
      const fetchBookingDetails = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:3000/api/bookings/user/${userId}`); // Update URL if needed
          const data = await response.json();
          
          if (response.ok) {
            setBookingDetails(data); // Assuming the response is an array of booking details
          } else {
            setBookingDetails([]); // If no bookings, ensure it's empty array
          }
        } catch (err) {
          setBookingDetails([]); // In case of error, set empty array
        } finally {
          setLoading(false);
        }
      };

      fetchBookingDetails();
    } else {
      setBookingDetails([]); // User not found, set empty array
      setLoading(false);
    }
  }, [userId]);

  // Function to determine the status badge color
  const getStatusClass = (status) => {
    switch (status) {
      case 'PENDING':
        return 'badge bg-primary'; // Blue for Pending
      case 'REJECTED':
        return 'badge bg-danger'; // Red for Rejected
      case 'ACCEPTED':
        return 'badge bg-success'; // Green for Accepted
      default:
        return 'badge bg-secondary'; // Default if unknown status
    }
  };

  return (
    <div className='booking-container'>
      <div className='card'>
        <div className='card-body'>
          <h2 className='card-title'>My Bookings</h2>

          {loading ? (
            <p>Loading booking details...</p>
          ) : (
            bookingDetails.length > 0 ? (
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th>Function Hall Name</th>
                    <th>Date</th>
                    <th>Expected Guests</th>
                    <th>Event Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingDetails.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.functionHall.name}</td>
                      <td>{booking.date}</td>
                      <td>{booking.expectedGuest}</td>
                      <td>{booking.eventType}</td>
                      <td>
                        <span className={getStatusClass(booking.bookingStatus)}>
                          {booking.bookingStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No bookings found.</p> // Only show this when not loading
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooking;

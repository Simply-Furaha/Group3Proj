import React, { useEffect, useState } from 'react';
import BookingForm from '../components/BookingForm';

function MyBookings({ buyerId }) {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/bookings/${buyerId}`)
            .then(response => response.json())
            .then(data => setBookings(data))
            .catch(error => console.error(error));
    }, [buyerId]);

    const handleDelete = (bookingId) => {
        fetch(`http://127.0.0.1:5555/bookings/${bookingId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setBookings(bookings.filter(booking => booking.id !== bookingId));
                    alert('Booking deleted successfully');
                } else {
                    alert('Failed to delete booking');
                }
            })
            .catch(error => console.error(error));
    };

    const handleEdit = (booking) => {
        setSelectedBooking(booking);
    };

    const handleCancelEdit = () => {
        setSelectedBooking(null);
    };

    return (
        <div>
            <h2>My Bookings</h2>
            <BookingForm
                buyerId={buyerId}
                selectedBooking={selectedBooking}
                setBookings={setBookings}
                handleCancelEdit={handleCancelEdit}
            />

            <ul>
                {bookings.length > 0 ? (
                    bookings.map(booking => (
                        <li key={booking.id}>
                            <p>Property ID: {booking.property_id}</p>
                            <p>Booking Date: {booking.booking_date}</p>
                            <button onClick={() => handleEdit(booking)}>Edit</button>
                            <button onClick={() => handleDelete(booking.id)}>Delete Booking</button>
                        </li>
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </ul>
        </div>
    );
}

export default MyBookings;

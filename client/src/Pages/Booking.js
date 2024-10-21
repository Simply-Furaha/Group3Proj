import React, { useEffect, useState } from 'react';
import BookingForm from '../components/BookingForm';

function MyBookings({ buyerId }) {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/bookings`)
            .then(response => response.json())
            .then(data => setBookings(data.filter(booking => booking.buyer_id === buyerId)))
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

    const handleCreateBooking = (propertyId, bookingDate) => {
        fetch(`http://127.0.0.1:5555/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                buyer_id: buyerId,
                property_id: propertyId,
                booking_date: bookingDate
            }),
        })
            .then(response => response.json())
            .then(newBooking => {
                setBookings([...bookings, newBooking]);
                alert('Booking created successfully!');
            })
            .catch(error => console.error('Error creating booking:', error));
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
                handleCreateBooking={handleCreateBooking} // Pass the create function to BookingForm
            />

            <ul>
                {bookings.length > 0 ? (
                    bookings.map(booking => (
                        <li key={booking.id}>
                            <p>Property ID: {booking.property_id}</p>
                            <p>Booking Date: {booking.booking_date}</p>
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

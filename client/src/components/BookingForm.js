import React, { useState } from 'react';

function BookingForm({ buyerId, propertyId, agentId, setBookings }) {
    const [bookingDate, setBookingDate] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`http://127.0.0.1:5555/bookings${propertyId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                booking_date: bookingDate,
                property_id: propertyId,
                agent_id: agentId, // Include the agent ID if needed
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to book viewing');
            }
            return response.json();
        })
        .then(newBooking => {
            setBookings(prevBookings => [...prevBookings, newBooking]);
            setBookingDate(""); // Reset form
            alert('Viewing booked successfully');
        })
        .catch(error => {
            console.error(error);
            alert('Failed to book viewing');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Booking Date:</label>
                <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Book Viewing</button>
        </form>
    );
}

export default BookingForm;
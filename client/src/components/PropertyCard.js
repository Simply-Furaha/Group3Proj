import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PropertyCard.css';

function PropertyCard({ property }) {
    const navigate = useNavigate();

    const handleBooking = () => {
        // Redirect to the buyer sign-up form
        navigate('/buyersignup');
    };

    return (
        <div className="property-card">
           
            <h2>{property.title}</h2>

            <div className='property description'>
                <p>Agent: {property.agent}</p>
                <p>{property.description}</p>
                <p>{property.location}</p>
                <p>{property.price}</p>
                <button onClick={handleBooking}>Book Now</button>
            </div>
        </div>
    );
}

export default PropertyCard;
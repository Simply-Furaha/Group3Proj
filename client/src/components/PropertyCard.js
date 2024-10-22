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
            {/* Property Image */}
            {property.image_url ? (
                <img src={property.image_url} alt={property.title} className="property-image" />
            ) : (
                <img
                    src="https://via.placeholder.com/300" // Placeholder image if no URL is provided
                    alt="Placeholder"
                    className="property-image"
                />
            )}

            {/* Property Details */}
            <h2>{property.title}</h2>
            <div className="property-description">
                <p><strong>Agent:</strong> {property.agent}</p>
                <p>{property.description}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Price:</strong> ${property.price}</p>
            </div>

            {/* Booking Button */}
            <button onClick={handleBooking} className="book-now-btn">Book Now</button>
        </div>
    );
}

export default PropertyCard;
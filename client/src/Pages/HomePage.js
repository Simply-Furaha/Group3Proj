import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';
import PropertyCard from '../components/PropertyCard';
import './HomePage.css';

function HomePage() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        // Fetch all properties from the database
        fetch("http://127.0.0.1:5555/properties")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch properties");
                }
                return response.json();
            })
            .then(data => {
                // Display only the first three properties on the homepage
                setProperties(data.slice(0, 3));
            })
            .catch(error => console.error("Error fetching properties:", error));
    }, []);

    return (
        <div>
            <Navbar />

            {/* Landing Section */}
            <div className='landingpage'>
                <div className="intro2">
                    <h1>Realtor</h1>
                    <h3>Find Your Perfect Home</h3>
                    <p>1000+ homes ready to satisfy your need in different locations.</p>
                    <p>Discover your home today!</p>
                </div>
            </div>

            {/* Properties Section */}
            <div className="Properties">
                <h1>Featured Properties</h1>
                <div className="property-list">
                    {properties.length > 0 ? (
                        properties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))
                    ) : (
                        <p>No properties available.</p>
                    )}
                </div>
                <Link to="/properties">
                    <button className="view-all-btn">View All Properties</button>
                </Link>
            </div>

            {/* About Us Section */}
            <section className="about-us">
                <div className="about-container">
                    <div className="about-content">
                        <h2>Welcome to Realtor</h2>
                        <p>
                            At Realtor, we are passionate about helping people find their dream home. 
                            Whether you're looking for a cozy apartment, a luxurious villa, or an investment property, 
                            we provide a seamless experience from start to finish.
                        </p>
                        <p>
                            With over 10 years in the real estate industry, we’ve helped thousands of clients find 
                            their perfect home across the globe. Our dedicated agents, cutting-edge technology, and 
                            extensive listings are here to make your home-buying journey smooth and enjoyable.
                        </p>
                        <p>
                            We believe that finding the right home is more than just a transaction—it’s about creating 
                            a space where memories are made. Let us help you turn your dreams into reality.
                        </p>
                    </div>
                    <div className="about-images">
                        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60" alt="Luxury Home" />
                        <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/390625008.jpg?k=a8ffcc4222528714e5dc3217926b3e2fcdf6ce43b9158715d64a075eada4e655&o=" alt="City Apartment" />
                        <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60" alt="Modern House" />
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2024 Realtor. All Rights Reserved.</p>
                    <p>123 Real Estate Street, Homesville, Country | Phone: +123 456 7890 | Email: info@micasa.com</p>
                    <div className="social-icons">
                        <a href="#" className="social-icon">Facebook</a>
                        <a href="#" className="social-icon">Twitter</a>
                        <a href="#" className="social-icon">Instagram</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;

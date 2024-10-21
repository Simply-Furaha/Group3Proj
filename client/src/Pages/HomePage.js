import React, { useState, useEffect}from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';
import PropertyCard from '../components/PropertyCard';
import './HomePage.css'

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
                setProperties(data);
            })
            .catch(error => console.error("Error fetching properties:", error));
    }, []);

    return (
        <div>
            <div className='landingpage'>
                
                <Navbar />
                <div className="display">
                    <div className="intro2">
                        <h1>Mi Casa Su Casa</h1>
                        <h3>Find your Perfect Home.</h3>
                        <p>1000+ homes ready to satisfy your need in different locations.</p>
                        <p>Discover your home Today</p>
                    </div>
                </div>
            </div>
            
            <div className="Properties">
                <h1>Properties</h1>
                <div className="property-list" >
                {properties.length > 0 ? (
                    properties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))
                ) : (
                    <p>No properties available.</p>
                )}
            </div>
            </div>
            <div className="agent">
                <h1>Do you have Property? Sign up to display.</h1>
                <Link to="/signup">
                    <button className="btn">Sign up</button>
                </Link>
                <Link to="/buyerLogin"><button>BuyerLogin</button></Link>
            </div>
        </div>
    );
}

export default HomePage;

import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import NavBar from '../components/NavBar'
function Properties() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchParams, setSearchParams] = useState({
        agent: '',
        location: '',
        minPrice: '',
        maxPrice: ''
    });

    useEffect(() => {
        fetch("http://127.0.0.1:5555/properties")
            .then(response => response.json())
            .then(data => {
                setProperties(data);
                setFilteredProperties(data);
            })
            .catch(error => console.error("Error fetching properties:", error));
    }, []);

    const handleSearch = () => {
        const { agent, location, minPrice, maxPrice } = searchParams;
        const filtered = properties.filter(property => {
            const matchesAgent = agent ? property.agent.toLowerCase().includes(agent.toLowerCase()) : true;
            const matchesLocation = location ? property.location.toLowerCase().includes(location.toLowerCase()) : true;
            const matchesMinPrice = minPrice ? property.price >= minPrice : true;
            const matchesMaxPrice = maxPrice ? property.price <= maxPrice : true;

            return matchesAgent && matchesLocation && matchesMinPrice && matchesMaxPrice;
        });
        setFilteredProperties(filtered);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div style={{ padding: '20px' }}>
            <div>
                <NavBar />
            </div>
            <h2>Properties</h2>
            <div>
                <input 
                    type="text" 
                    name="agent" 
                    placeholder="Search by Agent" 
                    value={searchParams.agent} 
                    onChange={handleChange} 
                />
                <input 
                    type="text" 
                    name="location" 
                    placeholder="Search by Location" 
                    value={searchParams.location} 
                    onChange={handleChange} 
                />
                <input 
                    type="number" 
                    name="minPrice" 
                    placeholder="Min Price" 
                    value={searchParams.minPrice} 
                    onChange={handleChange} 
                />
                <input 
                    type="number" 
                    name="maxPrice" 
                    placeholder="Max Price" 
                    value={searchParams.maxPrice} 
                    onChange={handleChange} 
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <ul>
                {filteredProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </ul>
        </div>
    );
}

export default Properties;

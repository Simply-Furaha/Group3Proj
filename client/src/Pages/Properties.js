import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import NavBar from '../components/NavBar';
import './Properties.css'; 

function Properties() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchParams, setSearchParams] = useState({
        agent: '',
        location: '',
        minPrice: '',
        maxPrice: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentProperty, setCurrentProperty] = useState(null);
    const [newProperty, setNewProperty] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        agent_id: ''
    });

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = () => {
        fetch("http://127.0.0.1:5555/properties")
            .then(response => response.json())
            .then(data => {
                setProperties(data);
                setFilteredProperties(data);
            })
            .catch(error => console.error("Error fetching properties:", error));
    };

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

    const handleNewPropertyChange = (e) => {
        const { name, value } = e.target;
        setNewProperty(prev => ({ ...prev, [name]: value }));
    };

    const addProperty = () => {
        fetch("http://127.0.0.1:5555/properties", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProperty)
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to add property');
                return response.json();
            })
            .then(data => {
                fetchProperties(); // Refresh properties list
                resetForm();
            })
            .catch(error => console.error("Error adding property:", error));
    };

    const editProperty = (property) => {
        setIsEditing(true);
        setCurrentProperty(property);
        setNewProperty({
            title: property.title,
            description: property.description,
            location: property.location,
            price: property.price,
            agent_id: property.agent_id,
        });
    };

    const updateProperty = () => {
        fetch(`http://127.0.0.1:5555/properties/${currentProperty.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProperty)
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to update property');
                return response.json();
            })
            .then(data => {
                fetchProperties(); // Refresh properties list
                resetForm();
            })
            .catch(error => console.error("Error updating property:", error));
    };

    const deleteProperty = (id) => {
        fetch(`http://127.0.0.1:5555/properties/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                fetchProperties(); // Refresh properties list
            })
            .catch(error => console.error("Error deleting property:", error));
    };

    const resetForm = () => {
        setIsEditing(false);
        setNewProperty({ title: '', description: '', location: '', price: '', agent_id: ''});
        setCurrentProperty(null);
    };

    return (
        <div className="properties-container">
            <NavBar />
            <h2 className="properties-title">Properties</h2>

            <div className="search-container">
                <h3>Search Properties</h3>
                <div className="search-inputs">
                    <input 
                        type="text" 
                        name="agent" 
                        placeholder="Search by Agent" 
                        value={searchParams.agent} 
                        onChange={handleChange} 
                        className="search-input" 
                    />
                    <input 
                        type="text" 
                        name="location" 
                        placeholder="Search by Location" 
                        value={searchParams.location} 
                        onChange={handleChange} 
                        className="search-input" 
                    />
                    <input 
                        type="number" 
                        name="minPrice" 
                        placeholder="Min Price" 
                        value={searchParams.minPrice} 
                        onChange={handleChange} 
                        className="search-input" 
                    />
                    <input 
                        type="number" 
                        name="maxPrice" 
                        placeholder="Max Price" 
                        value={searchParams.maxPrice} 
                        onChange={handleChange} 
                        className="search-input" 
                    />
                </div>
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>

            <div className="property-form">
                <h3>{isEditing ? 'Edit Property' : 'Add Property'}</h3>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    value={newProperty.title} 
                    onChange={handleNewPropertyChange} 
                    className="form-input" 
                />
                <input 
                    type="text" 
                    name="description" 
                    placeholder="Description" 
                    value={newProperty.description} 
                    onChange={handleNewPropertyChange} 
                    className="form-input" 
                />
                <input 
                    type="text" 
                    name="location" 
                    placeholder="Location" 
                    value={newProperty.location} 
                    onChange={handleNewPropertyChange} 
                    className="form-input" 
                />
                <input 
                    type="number" 
                    name="price" 
                    placeholder="Price" 
                    value={newProperty.price} 
                    onChange={handleNewPropertyChange} 
                    className="form-input" 
                />
                <input 
                    type="text" 
                    name="agent_id" 
                    placeholder="Agent ID" 
                    value={newProperty.agent_id} 
                    onChange={handleNewPropertyChange} 
                    className="form-input" 
                />
              
                {isEditing ? (
                    <button onClick={updateProperty} className="form-button">Update Property</button>
                ) : (
                    <button onClick={addProperty} className="form-button">Add Property</button>
                )}
                <button onClick={resetForm} className="form-button cancel-button">Cancel</button>
            </div>

            <h3 className="properties-list-title">Property Listings</h3>
            <ul className="property-list">
                {filteredProperties.map(property => (
                    <li key={property.id} className="property-item">
                        <PropertyCard property={property} />
                        <div className="property-actions">
                            <button onClick={() => editProperty(property)} className="action-button">Edit</button>
                            <button onClick={() => deleteProperty(property.id)} className="action-button">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Properties;

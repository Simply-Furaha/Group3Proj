import React, { useEffect, useState } from 'react'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropertyCard from '../components/PropertyCard';
import NavBar from '../components/NavBar';
import './Properties.css'
import { faker } from '@faker-js/faker'

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

    useEffect(() => {
        generateRandomData(20);
        fetchProperties();
    }, []);


    async function generateRandomData(numProperties) {
        const randomData = [];
    
        for (let i = 0; i < numProperties; i++) {
            const property = {
                title: faker.lorem.words(3),
                description: faker.lorem.sentences(2),
                location: faker.location.city(), // Updated from faker.address.city() to faker.location.city()
                price: faker.commerce.price(50000, 5000000),
                agent_id: faker.string.uuid(), // Updated from faker.datatype.uuid() to faker.string.uuid()
                image_url: faker.image.city() // Generates a random image URL
            };
            randomData.push(property);
        }
    
        // Send random data to the server
        try {
            const response = await fetch('https://group3proj.onrender.com/properties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(randomData)
            });
            if (!response.ok) throw new Error('Failed to save random properties');
            console.log('Random properties saved successfully!');
        } catch (error) {
            console.error('Error generating random data:', error);
        }
    }

    const fetchProperties = () => {
        fetch("https://group3proj.onrender.com/properties")
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

    const handleNewPropertySubmit = (values, { resetForm }) => {
        const method = isEditing ? 'PATCH' : 'POST';
        const url = isEditing
            ? `https://group3proj.onrender.com/properties/${currentProperty.id}`
            : 'https://group3proj.onrender.com/properties';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to save property');
                return response.json();
            })
            .then(data => {
                fetchProperties(); // Refresh properties list
                resetForm();
                resetFormState();
            })
            .catch(error => console.error("Error saving property:", error));
    };

    const editProperty = (property) => {
        setIsEditing(true);
        setCurrentProperty(property);
    };

    const resetFormState = () => {
        setIsEditing(false);
        setCurrentProperty(null);
    };

    const deleteProperty = (id) => {
        fetch(`https://group3proj.onrender.com/properties/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                fetchProperties(); // Refresh properties list
            })
            .catch(error => console.error("Error deleting property:", error));
    };

    const PropertySchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        location: Yup.string().required('Location is required'),
        price: Yup.number().required('Price is required').positive('Price must be positive'),
        agent_id: Yup.string().required('Agent ID is required'),
        image_url: Yup.string().url('Must be a valid URL')
    });

    return (
        <div className="properties-container">
            <NavBar />
            <h2 className="properties-title">Explore Properties</h2>

            <div className="search-container">
                <h3>Search Properties</h3>
                <div className="search-inputs">
                    <input
                        type="text"
                        name="agent"
                        placeholder="Search by Agent"
                        value={searchParams.agent}
                        onChange={e => setSearchParams({ ...searchParams, agent: e.target.value })}
                        className="search-input"
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Search by Location"
                        value={searchParams.location}
                        onChange={e => setSearchParams({ ...searchParams, location: e.target.value })}
                        className="search-input"
                    />
                    <input
                        type="number"
                        name="minPrice"
                        placeholder="Min Price"
                        value={searchParams.minPrice}
                        onChange={e => setSearchParams({ ...searchParams, minPrice: e.target.value })}
                        className="search-input"
                    />
                    <input
                        type="number"
                        name="maxPrice"
                        placeholder="Max Price"
                        value={searchParams.maxPrice}
                        onChange={e => setSearchParams({ ...searchParams, maxPrice: e.target.value })}
                        className="search-input"
                    />
                </div>
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>

            <div className="property-form">
                <h3>{isEditing ? 'Edit Property' : 'Add Property'}</h3>
                <Formik
                    initialValues={{
                        title: currentProperty ? currentProperty.title : '',
                        description: currentProperty ? currentProperty.description : '',
                        location: currentProperty ? currentProperty.location : '',
                        price: currentProperty ? currentProperty.price : '',
                        agent_id: currentProperty ? currentProperty.agent_id : '',
                        image_url: currentProperty ? currentProperty.image_url : '' // Add the image URL field
                    }}
                    validationSchema={PropertySchema}
                    onSubmit={handleNewPropertySubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="form">
                            <Field type="text" name="title" placeholder="Title" className="form-input" />
                            <ErrorMessage name="title" component="div" className="error" />
                            <Field type="text" name="description" placeholder="Description" className="form-input" />
                            <ErrorMessage name="description" component="div" className="error" />
                            <Field type="text" name="location" placeholder="Location" className="form-input" />
                            <ErrorMessage name="location" component="div" className="error" />
                            <Field type="number" name="price" placeholder="Price" className="form-input" />
                            <ErrorMessage name="price" component="div" className="error" />
                            <Field type="text" name="agent_id" placeholder="Agent ID" className="form-input" />
                            <ErrorMessage name="agent_id" component="div" className="error" />
                            {/* Field for the Image URL */}
                            <Field type="text" name="image_url" placeholder="Image URL" className="form-input" />
                            <ErrorMessage name="image_url" component="div" className="error" />
                            <button type="submit" className="form-button" disabled={isSubmitting}>
                                {isEditing ? 'Update Property' : 'Add Property'}
                            </button>
                            <button type="button" className="form-button cancel-button" onClick={resetFormState}>Cancel</button>
                        </Form>
                    )}
                </Formik>
            </div>

            <h3 className="properties-list-title">Property Listings</h3>
            <div className="property-grid">
                {filteredProperties.map(property => (
                    <div key={property.id} className="property-item">
                        <PropertyCard property={property} />
                        <div className="property-actions">
                            <button onClick={() => editProperty(property)} className="action-button">Edit</button>
                            <button onClick={() => deleteProperty(property.id)} className="action-button delete-button">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Properties;

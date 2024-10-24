import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import './SignupForm.css';
import NavBar from './NavBar'

function SignupForm() {
    const [agents, setAgents] = useState([]);
    const navigate = useNavigate();
    const location = useLocation(); // Get current location

    // Validation schema
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a name").max(15),
        email: yup.string().email("Invalid email").required("Must enter email"),
        phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Must enter a phone number"),
        password: yup.string().required("Must enter a password").min(6, "Password must be at least 6 characters"),
    });

    // Formik setup
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            phone: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("https://group3proj.onrender.com/agents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then(response => {
                    if (response.status === 409) {
                        throw new Error('User already exists');
                    } else if (response.status === 400) {
                        throw new Error('Email already in use');
                    } else if (!response.ok) {
                        throw new Error('Failed to register user');
                    }
                    return response.json();
                })
                .then(data => {
                    setAgents([...agents, values]);  // Update agents state
                    alert('User registered successfully');
                    navigate('/login');
                })
                .catch(error => {
                    console.error(error);
                    alert(error.message); // Show the specific error message
                });
        }
    });

    return (
        <div className="signup-container">
            {/* Conditionally render NavBar */}
            {location.pathname !== '/signup' && (
                <div className="nav">
                    <NavBar />
                </div>
            )}
            <h2>Sign Up</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className="error-message">{formik.errors.username}</div>
                    ) : null}
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="error-message">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="error-message">{formik.errors.phone}</div>
                    ) : null}
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="error-message">{formik.errors.password}</div>
                    ) : null}
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupForm;

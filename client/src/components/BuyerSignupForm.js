import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

function BuyerSignupForm() {
    const navigate = useNavigate();
    const formSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("https://group3proj.onrender.com/buyers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to register buyer');
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Buyer registered successfully');
                    navigate('/booking'); // Redirect to the booking page

                    // Redirect or perform another action if needed
                })
                .catch(error => {
                    console.error(error);
                    alert('Failed to register buyer');
                });
        },
    });

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Buyer Sign Up</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div style={{ color: 'red' }}>{formik.errors.name}</div>
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
                        <div style={{ color: 'red' }}>{formik.errors.email}</div>
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
                        <div style={{ color: 'red' }}>{formik.errors.phone}</div>
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
                        <div style={{ color: 'red' }}>{formik.errors.password}</div>
                    ) : null}
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <button onClick={() => navigate('/buyerLogin')} style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                    Already have an account? Log In
                </button>
            </div>
        </div>
    );
}

export default BuyerSignupForm;
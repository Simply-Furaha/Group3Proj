import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function LoginForm() {
    const navigate = useNavigate();

    // Validation schema
    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Must enter email"),
        password: yup.string().required("Must enter a password").min(6, "Password must be at least 6 characters"),
    });

    // Formik setup
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("https://group3proj.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then((r) => r.json())
                .then(data => {
                    // Assuming the server returns a token or success response
                    navigate('../agents'); // Redirect to the agent dashboard
                })
                .catch(error => {
                    console.error(error);
                    alert(error.message); // Show the error message
                });
        }
    });

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <NavBar />
            <h2>Log In</h2>
            <form onSubmit={formik.handleSubmit}>
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
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default LoginForm;

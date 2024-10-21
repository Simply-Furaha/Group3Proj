// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/properties">Properties</Link></li>
                <li><Link to="/agents">Agents</Link></li>
                <div id="auth">
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Log In</Link></li>
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;

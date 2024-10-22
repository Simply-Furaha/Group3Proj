// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active link styling
import './NavBar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li>
                    <NavLink exact to="/" activeClassName="active">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/properties" activeClassName="active">Properties</NavLink>
                </li>
                <li>
                    <NavLink to="/agents" activeClassName="active">Agents</NavLink>
                </li>
            </ul>
            <ul className="navbar-list" id="auth">
                <li>
                    <NavLink to="/signup" activeClassName="active">Sign Up</NavLink>
                </li>
                <li>
                    <NavLink to="/login" activeClassName="active">Log In</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Remove the token from local storage
        localStorage.removeItem('token');
        console.log('User  logged out successfully.');

        // Redirect to the login page or home page
        navigate('/login'); // Change this to '/' if you want to redirect to the home page
    }, [navigate]);

    return (
        <div className="logout-container">
            <h2>Logging out...</h2>
            <p>You will be redirected shortly.</p>
        </div>
    );
}

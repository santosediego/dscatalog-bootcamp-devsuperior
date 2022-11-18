import React from 'react';
import Navbar from './Navbar';
import './styles.css';

const Admin = () => {
    return (
        <div className="admin-container">
            <Navbar />
            <div className="admin-content">
                <p>content</p>
            </div>
        </div>
    );
}

export default Admin;

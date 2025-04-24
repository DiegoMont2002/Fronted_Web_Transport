// src/Components/LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ fullScreen = false }) => (
  <div className={`spinner-container ${fullScreen ? 'full-screen' : ''}`}>
    <div className="spinner"></div>
  </div>
);

export default LoadingSpinner;
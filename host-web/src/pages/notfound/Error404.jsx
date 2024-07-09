import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './error404.css';

const Error404 = () => {
  return (
    <div className="error404-container">
      <div className="error404-content">
        <h3>Error 404</h3>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
      <div className="error404-btn">
      <button type="button"><Link to="/home">Go back</Link></button>
      </div>
    </div>
  );
};

export default Error404;

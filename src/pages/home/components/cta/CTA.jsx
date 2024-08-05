import React from 'react';
import './cta.css';
import { Link } from 'react-router-dom'; // Import Link component

const CTA = () => (
  <div className="magazine__cta">
    <div className="magazine__cta-content">
      <p>Unlock Exclusive Access to Begin Your Journey</p>
      <h3>Join Us Today & Dive into a World of Boundless Discoveries.</h3>
    </div>
    <div className="magazine__cta-btn">
    <button type="button"><Link to="/login">Start Exploring</Link></button> {/* Link to the sign-up page */}
    </div>
  </div>
);

export default CTA;

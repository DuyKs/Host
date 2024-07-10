import React from 'react';
import './footer.css';

const Footer = () => (
  <div className="magazine__footer section__padding">
    <div className="magazine__footer-heading">
      <h1 className="gradient__text">Stay Ahead of the Curve with the Latest Magazines</h1>
    </div>
    <div className="magazine__footer-btn">
      <p>Subscribe Now</p>
    </div>

    <div className="magazine__footer-links">
      <div className="magazine__footer-links_logo">
        <p>Annual Magazine, <br /> All Rights Reserved</p>
      </div>
      <div className="magazine__footer-links_div">
        <h4>Explore</h4>
        <p>About Us</p>
        <p>Magazine Categories</p>
        <p>Featured Authors</p>
        <p>Subscription</p>
      </div>
      <div className="magazine__footer-links_div">
        <h4>Legal</h4>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
        <p>Contact Us</p>
      </div>
      <div className="magazine__footer-links_div">
        <h4>Contact</h4>
        <p>Annual Magazine</p>
        <p>555-123-4567</p>
        <p>info@magazineworld.com</p>
      </div>
    </div>

    <div className="magazine__footer-copyright">
      <p>@2024 Magazine World. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;

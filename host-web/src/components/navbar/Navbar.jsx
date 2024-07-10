import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom'; // Import Link component
import './navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="magazine__navbar">
      <div className="magazine__navbar-links">
        <div className="magazine__navbar-links_logo">
        </div>

        <div className="magazine__navbar-links_container">
          <p><Link to="/">Home</Link></p>
          <p><Link to="/news">News</Link></p>
          <p><Link to="/events">Events</Link></p>
          <p><Link to="/library">Library</Link></p>
        </div>
      </div>

      <div className="magazine__navbar-sign">
        <p><Link to="/login">Sign in</Link></p>
        <button type="button"><Link to="/signup">Sign up</Link></button> {/* Link to the sign-up page */}
      </div>

      <div className="magazine__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="magazine__navbar-menu_container scale-up-center">
            <div className="magazine__navbar-menu_container-links">
              <p><Link to="/">Home</Link></p>
              <p><Link to="/news">News</Link></p>
              <p><Link to="/events">Events</Link></p>
              <p><Link to="/library">Library</Link></p>
            </div>

            <div className="magazine__navbar-menu_container-links-sign">
              <p><Link to="/login">Sign in</Link></p> {/* Link to the sign-in page */}
              <button type="button"><Link to="/signup">Sign up</Link></button> {/* Link to the sign-up page */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

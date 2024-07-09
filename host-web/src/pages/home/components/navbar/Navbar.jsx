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
          <p><Link to="/publicmagazine">Faculties</Link></p>
        </div>
      </div>

      <div className="magazine__navbar-sign">
        <button type="button"><Link to="/login">Sign in</Link></button> {/* Link to the sign-up page */}
      </div>

      <div className="magazine__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="magazine__navbar-menu_container scale-up-center">
            <div className="magazine__navbar-menu_container-links">
              <p><Link to="/">Home</Link></p>
              <p><Link to="/publicmagazine">Faculties</Link></p>
            </div>

            <div className="magazine__navbar-menu_container-links-sign">
              <button type="button"><Link to="/login">Sign in</Link></button> {/* Link to the sign-up page */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './navbarLogin.css';

const NavbarLogined = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const usernameParam = searchParams.get('username');
    const userRoleParam = searchParams.get('userRole');
    if (usernameParam) {
      setUsername(usernameParam);
    }
    if (userRoleParam) {
      setUserRole(userRoleParam);
    }
  }, [location]);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="magazine__navbar">
      <div className="magazine__navbar-links">
        <div className="magazine__navbar-links_logo"></div>
        <div className="magazine__navbar-links_container">
          <p>
            <Link to={`/?username=${username}&userRole=${userRole}`}>Home</Link>
          </p>
          <p>
            <Link to={`/publicmagazine?username=${username}&userRole=${userRole}`}>Faculties</Link>
          </p>
          {/* Conditionally render My Dashboard link based on userRole */}
          {username && userRole && userRole !== 'guest' && (
            <p>
              <Link to={`/${userRole}/dashboard?username=${username}`}>My Dashboard</Link>
            </p>
          )}
        </div>
      </div>

      {username && (
        <div className="magazine__navbar-user">
          <p className="user-username">{username}</p>
        </div>
      )}

      <div className="magazine__navbar-sign">
        {username ? (
          <button type="button" onClick={handleLogout}>Logout</button>
        ) : (
          <button type="button">
            <Link to="/login">Sign in</Link>
          </button>
        )}
      </div>

      <div className="magazine__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
        ) : (
          <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <div className="magazine__navbar-menu_container scale-up-center">
            <div className="magazine__navbar-menu_container-links">
              {/* Conditionally render My Dashboard link in mobile menu based on userRole */}
              {username && userRole && userRole !== 'guest' && (
                <p>
                  <Link to={`/${userRole}/dashboard?username=${username}`}>My Dashboard</Link>
                </p>
              )}
              <p>
                <Link to={`/publicmagazine?username=${username}&userRole=${userRole}`}>Faculties</Link>
              </p>
              <p>
                <Link to={`/?username=${username}&userRole=${userRole}`}>Home</Link>
              </p>
            </div>

            <div className="magazine__navbar-menu_container-links-sign">
              {username ? (
                <button type="button" onClick={handleLogout}>Logout</button>
              ) : (
                <button type="button">
                  <Link to="/login">Sign in</Link>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarLogined;

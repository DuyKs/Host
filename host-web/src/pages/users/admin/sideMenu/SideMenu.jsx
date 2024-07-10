import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaNewspaper, FaEye, FaCog, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { IoMdPersonAdd } from "react-icons/io";
import './sideMenu.css';

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [username, setUsername] = useState('');
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const usernameParam = searchParams.get('username');
    if (usernameParam) {
      setUsername(usernameParam);
    }
  }, [location]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    // Clear user information
    setUsername('');
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className={`sider ${collapsed ? 'collapsed' : ''}`}>
      <div className="trigger" onClick={toggle}>
        {collapsed ? (
          <span>&#x2630;</span>
        ) : (
          <span>&#x2715;</span>
        )}
      </div>
      <ul className="menu">
        <li>
          <Link to={`/admin/dashboard?username=${username}`}>
            {collapsed ? <FaHome /> : <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to={`/admin/submit-magazine?username=${username}`}>
            {collapsed ? <FaNewspaper /> : <span>Submission</span>}
          </Link>
        </li>
        <li>
          <Link to={`/admin/check-publish-status?username=${username}`}>
            {collapsed ? <FaEye /> : <span>Status</span>}
          </Link>
        </li>
        <li>
          <Link to={`/admin/register?username=${username}`}>
            {collapsed ? <IoMdPersonAdd /> : <span>Registration</span>}
          </Link>
        </li>
        <li>
          <Link to={`/admin/settings?username=${username}`}>
            {collapsed ? <FaCog /> : <span>Settings</span>}
          </Link>
        </li>
        <li>
          <Link to="/login" onClick={handleLogout}>
            {collapsed ? <FaSignOutAlt /> : <span>Logout</span>}
          </Link>
        </li>
      </ul>
      <div className="user-info">
        {collapsed ? (
          <FaUser />
        ) : (
          <p>{username}</p>
        )}
      </div>
    </div>
  );
};

export default SideMenu;

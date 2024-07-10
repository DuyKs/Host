import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCog, FaSignOutAlt, FaUser, FaChartBar } from 'react-icons/fa';
import { HiArchiveBox } from "react-icons/hi2";
import { MdComment } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

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
          <Link to={`/coordinator/dashboard?username=${username}`}>
            {collapsed ? <RxDashboard /> : <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to={`/coordinator/view-submissions?username=${username}`}>
            {collapsed ? <HiArchiveBox  /> : <span>View Submissions</span>}
          </Link>
        </li>
        <li>
          <Link to={`/coordinator/comment?username=${username}`}>
            {collapsed ? <MdComment /> : <span>Comment on Submissions</span>}
          </Link>
        </li>
        <li>
          <Link to={`/coordinator/statistical-analysis?username=${username}`}>
            {collapsed ? <FaChartBar /> : <span>Statistical Analysis</span>}
          </Link>
        </li>
        <li>
          <Link to={`/Student/settings?username=${username}`}>
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

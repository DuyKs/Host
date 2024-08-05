import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { MdComment, MdPublishedWithChanges } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { BsWindowPlus } from "react-icons/bs";

import './sideMenu.css';

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const usernameParam = searchParams.get('username');
    if (usernameParam) {
      setUsername(usernameParam);
      // Fetch user role based on the username
      fetchUserRole(usernameParam);
    }
  }, [location]);

  // Function to fetch user role based on username
  const fetchUserRole = async (username) => {
    try {
      // Make an API call to fetch the user's role
      const response = await fetch(`http://localhost:5000/fetchRoleBaseOnUsername?username=${username}`);
      if (response.ok) {
        const data = await response.json();
        setUserRole(data.role); // Assuming the response contains the user's role
      } else {
        console.error('Failed to fetch user role:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    // Clear user information
    setUsername('');
    setUserRole('');
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
          <Link to={`/coordinator/submissionwindow?username=${username}`}>
            {collapsed ? <BsWindowPlus /> : <span>Submission Window</span>}
          </Link>
        </li>
        {userRole === 'admin' && (
          <>
            <li>
              <Link to={`/coordinator/register?username=${username}`}>
                {collapsed ? <FaUser /> : <span>Manage Users</span>}
              </Link>
            </li>
            <li>
              <Link to={`/coordinator/faculty?username=${username}`}>
                {collapsed ? <FaUser /> : <span>Manage Faculties</span>}
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to={`/coordinator/viewsubmission?username=${username}&userRole=${userRole}`}>
            {collapsed ? <MdComment /> : <span>View Submissions</span>}
          </Link>
        </li>
        <li>
          <Link to={`/publicmagazine?username=${username}&userRole=coordinator`}>
            {collapsed ? <MdPublishedWithChanges /> : <span>Submissions</span>}
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

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link component and hooks
import './dashBoard.css'; // Import your CSS file for styling
import { FaNewspaper, FaCheckCircle } from 'react-icons/fa'; // Import icons from react-icons library
import SideMenu from '../sideMenu/SideMenu';

const DashBoard = () => {
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

  return (
    <div>
      <SideMenu />
      <div className="dashboard">
        <h2>My Dashboard</h2>
        <div className="box-container">
          <div className="box">
            <FaNewspaper className="icon" />
            <h3>Submit Magazine</h3>
            <p>Submission form to submit magazine</p>
            <Link to={`/Student/submit-magazine?username=${username}`}>View Submit Form</Link> {/* Pass username to link */}
          </div>
          <div className="box">
            <FaCheckCircle className="icon" />
            <h3>Status</h3>
            <p>Checking submissions status</p>
            <Link to={`/Student/check-publish-status?username=${username}`}>View Status</Link> {/* Pass username to link */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

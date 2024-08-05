import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link component and useLocation hook

import './notAuthorized.css';

const NotAuthorized = () => {
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const location = useLocation(); // useLocation hook to access the current URL location

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:5000/fetchSubmissions');
        if (response.ok) {
          const data = await response.json();
          // setSubmissions(data); // Assuming submissions are not used in this component
        } else {
          console.error('Failed to fetch submissions:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };
    fetchSubmissions();

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

  return (
    <div className="not-authorized-container">
      <h2 className="not-authorized-heading">Not Authorized</h2>
      <p className="not-authorized-message">You are not authorized to access this page. Please return.</p>
      <div className="not-authorized-btn">
        <button type="button">
          <Link to={`/home?username=${username}&${userRole}`}>Go back</Link>
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;

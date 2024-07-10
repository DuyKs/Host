import React, { useState, useEffect } from 'react';
import './dashBoard.css'; // Import your CSS file for styling
import { FaNewspaper, FaChartBar, FaBell } from 'react-icons/fa'; // Import icons from react-icons library
import SideMenu from '../sideMenu/SideMenu';

const ManagerDashboard = () => {
  // Mock data for submitted magazines (replace with actual data from backend)
  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    // Fetch data from backend or API
    // Example of mock data
    const mockData = [
      { id: 1, title: 'Magazine 1', status: 'Approved' },
      { id: 2, title: 'Magazine 2', status: 'Pending' },
      { id: 3, title: 'Magazine 3', status: 'Rejected' }
    ];
    setMagazines(mockData);
  }, []);

  return (
    <div>
      <SideMenu />
      <div className="dashboard">
        <h2>Manager Dashboard</h2>
        <div className="box-container">
          <div className="box">
            <FaNewspaper className="icon" />
            <h3>View Contributions</h3>
            <p>View and manage all selected contributions</p>
          </div>
          <div className="box">
            <FaChartBar className="icon" />
            <h3>Statistical Analysis</h3>
            <p>Access statistical analysis related to contributions</p>
          </div>
          <div className="box">
            <FaBell className="icon" />
            <h3>Notifications</h3>
            <p>Receive notifications about new contributions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;

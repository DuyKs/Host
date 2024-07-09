import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashBoard.css';
import { FaUser } from 'react-icons/fa';
import SideMenu from '../sideMenu/SideMenu';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState({});

  useEffect(() => {
    fetchTotalUsers();
  }, []);

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/totalUsers');
      setTotalUsers(response.data);
    } catch (error) {
      console.error('Error fetching total users:', error);
    }
  };

  const renderTotalUsersChart = () => {
    return (
      <div className="box">
        <FaUser className="icon" />
        <h3>Total Users</h3>
        <VictoryChart
          domainPadding={20}
          theme={VictoryTheme.material}
        >
          <VictoryAxis
            tickValues={['Managers', 'Coordinators', 'Students', 'Guest']}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `${x}`}
          />
          <VictoryBar
            data={[
              { x: 'Managers', y: totalUsers.managers || 0 },
              { x: 'Coordinators', y: totalUsers.coordinators || 0 },
              { x: 'Students', y: totalUsers.students || 0 },
              { x: 'Guest', y: totalUsers.guests || 0 } // Use totalUsers.guest instead of totalUsers.guests
            ]}
            style={{
              data: { fill: 'rgba(255, 99, 132, 0.6)' }
            }}
          />
        </VictoryChart>
      </div>
    );
  };

  return (
    <div>
      <SideMenu />
      <div className="dashboard">
        <h2>Static Analysis Dashboard</h2>
        <div className="box-container">
          {renderTotalUsersChart()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

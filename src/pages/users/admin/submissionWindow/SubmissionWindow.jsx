import React, { useState, useEffect } from 'react';
import './submissionWindow.css';
import SideMenu from '../sideMenu/SideMenu';

const CoordinatorSubmissionWindow = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [faculty, setFaculty] = useState('');
  const [faculties, setFaculties] = useState([]);
  const [submissionWindowExists, setSubmissionWindowExists] = useState(false);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await fetch('http://localhost:5000/getAllFaculties');
      if (response.ok) {
        const data = await response.json();
        setFaculties(data);
      } else {
        throw new Error('Failed to fetch faculties');
      }
    } catch (error) {
      console.error('Error fetching faculties:', error);
    }
  };

  const fetchSubmissionWindow = async (selectedFaculty) => {
    try {
      const response = await fetch(`http://localhost:5000/submissionWindow/${selectedFaculty}`);
      if (response.ok) {
        const data = await response.json();
        setStartTime(formatDateTime(data.startTime));
        setEndTime(formatDateTime(data.endTime));
        setSubmissionWindowExists(true);
      } else if (response.status === 404) {
        setSubmissionWindowExists(false);
        setStartTime('');
        setEndTime('');
      } else {
        throw new Error('Failed to fetch submission window');
      }
    } catch (error) {
      console.error('Error fetching submission window:', error);
    }
  };

  const formatDateTime = (dateTime) => {
    return dateTime.replace('T', ' ').slice(0, -5); // Remove 'T' and timezone offset
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (submissionWindowExists) {
        await updateSubmissionWindow();
      } else {
        await createNewSubmissionWindow();
      }
    } catch (error) {
      console.error('Error handling submission:', error);
    }
  };

  const createNewSubmissionWindow = async () => {
    try {
      const response = await fetch('http://localhost:5000/createSubmissionWindow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faculty, startTime, endTime })
      });
      if (response.ok) {
        await fetchSubmissionWindow(faculty);
      } else {
        throw new Error('Failed to create new submission window');
      }
    } catch (error) {
      console.error('Error creating new submission window:', error);
    }
  };

  const updateSubmissionWindow = async () => {
    try {
      const response = await fetch('http://localhost:5000/updateSubmissionWindow', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faculty, startTime, endTime })
      });
      if (response.ok) {
        await fetchSubmissionWindow(faculty);
      } else {
        throw new Error('Failed to update submission window');
      }
    } catch (error) {
      console.error('Error updating submission window:', error);
    }
  };

  useEffect(() => {
    if (faculty) {
      fetchSubmissionWindow(faculty);
    }
  }, [faculty]);

  return (
    <div className="submission-window-container">
      <h2>Submission Window</h2>
      <div>
        <label htmlFor="faculty"> Select Faculty:</label>
        <select value={faculty} onChange={(e) => setFaculty(e.target.value)}>
          <option value="">Select Faculty</option>
          {faculties.map((faculty) => (
            <option key={faculty._id} value={faculty.name}>{faculty.name}</option>
          ))}
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Start Date & Time:</label>
        <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        <label>End Date & Time:</label>
        <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        <button type="submit">
          {submissionWindowExists ? 'Update Submission Window' : 'Add New Submission Window'}
        </button>
      </form>
      <div className="side-menu-container">
        <SideMenu />
      </div>
    </div>
  );
};

export default CoordinatorSubmissionWindow;

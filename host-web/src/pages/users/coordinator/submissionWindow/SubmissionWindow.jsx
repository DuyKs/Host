import React, { useState, useEffect } from 'react';
import './submissionWindow.css';
import SideMenu from '../sideMenu/SideMenu';

const CoordinatorSubmissionWindow = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [faculty, setFaculty] = useState('');
  const [submissionWindowExists, setSubmissionWindowExists] = useState(false); // State to track if a submission window exists

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      // Fetch the username from the URL query parameters
      const searchParams = new URLSearchParams(window.location.search);
      const username = searchParams.get('username');

      // Fetch faculty based on the username
      const response = await fetch(`http://localhost:5000/getFaculty?username=${username}`);
      if (response.ok) {
        const data = await response.json();
        setFaculty(data.faculty); // Set faculty received from the server
        fetchSubmissionWindow(data.faculty); // Fetch submission window based on the faculty
      } else {
        throw new Error(`Failed to fetch faculty: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching faculty:', error);
    }
  };

  const fetchSubmissionWindow = async (faculty) => {
    try {
      // Fetch submission window based on the faculty
      const response = await fetch(`http://localhost:5000/submissionWindow/${faculty}`);
      if (response.ok) {
        const data = await response.json();
        setStartTime(data.startTime);
        setEndTime(data.endTime);
        setSubmissionWindowExists(true); // Submission window exists for this faculty
      } else if (response.status === 404) {
        // If submission window is not found, set the flag to false
        setSubmissionWindowExists(false);
      } else {
        throw new Error(`Failed to fetch submission window: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching submission window:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (submissionWindowExists) {
        // If submission window exists, update it
        await updateSubmissionWindow();
      } else {
        // Otherwise, create a new submission window
        await createNewSubmissionWindow();
      }
    } catch (error) {
      console.error('Error handling submission:', error);
    }
  };

  const createNewSubmissionWindow = async () => {
    try {
      // Create a new submission window for the specified faculty
      const response = await fetch(`http://localhost:5000/createSubmissionWindow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faculty, startTime, endTime }) // Initialize with provided values
      });
      if (response.ok) {
        console.log(`New submission window created for ${faculty}`);
        // Fetch the newly created submission window
        await fetchSubmissionWindow(faculty);
      } else {
        throw new Error(`Failed to create new submission window: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error creating new submission window:', error);
    }
  };

  const updateSubmissionWindow = async () => {
    try {
      // Update the existing submission window for the specified faculty
      const response = await fetch(`http://localhost:5000/updateSubmissionWindow`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faculty, startTime, endTime }) // Update with new values
      });
      if (response.ok) {
        console.log(`Submission window updated for ${faculty}`);
        // Fetch the updated submission window
        await fetchSubmissionWindow(faculty);
      } else {
        throw new Error(`Failed to update submission window: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating submission window:', error);
    }
  };

  return (
    <div className="submission-window-container">
      <h2>Submission Window</h2>
      {/* Faculty input (disabled) */}
      <label htmlFor="faculty"> Faculty:</label>
      <input
        type="text"
        className="faculty-input"
        value={faculty}
        disabled
      />
      <form onSubmit={handleSubmit}>
        <label>Start Date & Time:</label>
        <input type="datetime-local" value={startTime ? new Date(startTime).toISOString().slice(0, 16) : ''} onChange={(e) => setStartTime(e.target.value)} required />
        <label>End Date & Time:</label>
        <input type="datetime-local" value={endTime ? new Date(endTime).toISOString().slice(0, 16) : ''} onChange={(e) => setEndTime(e.target.value)} required />
        {/* Render button to create or update submission window */}
        <button type="submit">
          {submissionWindowExists ? 'Update Submission Window' : 'Add New Submission Window'}
        </button>
      </form>
      <div className="side-menu-container">
        <SideMenu/>
      </div>
    </div>
  );
};

export default CoordinatorSubmissionWindow;

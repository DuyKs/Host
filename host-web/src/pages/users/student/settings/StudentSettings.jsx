import React, { useState, useEffect, useRef } from 'react';
import './settings.css'; // Import your CSS file for styling
import { FaUser } from 'react-icons/fa'; // Import icon from react-icons library
import SideMenu from '../sideMenu/SideMenu';

const Settings = () => {
  // State for student data and modified data
  const [studentData, setStudentData] = useState(null);
  const [modifiedData, setModifiedData] = useState(null);
  const [newPictureSelected, setNewPictureSelected] = useState(false); // State to track new picture selection
  const fileInputRef = useRef(null); // Reference for file input element

  useEffect(() => {
    // Fetch student data from MongoDB or API
    // Example of mock data
    const mockData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      profilePicture: null, // Initialize profile picture as null
      // Other student information...
    };
    setStudentData(mockData);
    setModifiedData(mockData);
  }, []);

  // Function to handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setModifiedData({ ...modifiedData, profilePicture: imageUrl });
    setNewPictureSelected(true); // Set new picture selection state to true
  };

  // Function to trigger file input click
  const handlePlaceholderClick = () => {
    fileInputRef.current.click();
  };

  // Function to save changes
  const handleSaveChanges = () => {
    // Save modified data to MongoDB or API
    setStudentData(modifiedData);
    setNewPictureSelected(false); // Reset new picture selection state to false
  };

  // Function to cancel changes
  const handleCancelChanges = () => {
    // Reset modified data to original data
    setModifiedData(studentData);
    setNewPictureSelected(false); // Reset new picture selection state to false
  };

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="settings-page">
    <SideMenu />
      <h2>Profile</h2>
      <div className="profile-info">
        <div className="profile-picture">
          {modifiedData.profilePicture ? (
            <img src={modifiedData.profilePicture} alt="Profile" onClick={handlePlaceholderClick} />
          ) : (
            <FaUser className="placeholder-icon" onClick={handlePlaceholderClick} />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            ref={fileInputRef}
            style={{ display: 'none' }} // Hide the file input
          />
        </div>
        <div className="student-details">
          <h3>{modifiedData.name}</h3>
          <p>Email: {modifiedData.email}</p>
          {/* Display other student information */}
        </div>
      </div>
      {newPictureSelected && (
        <div className="buttons">
          <button onClick={handleSaveChanges}>Save</button>
          <button onClick={handleCancelChanges}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Settings;

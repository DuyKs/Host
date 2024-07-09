import React, { useState, useEffect } from 'react';
import './viewSelectedSubmission.css';
import SideMenu from '../sideMenu/SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFilePdf, faEye } from '@fortawesome/free-solid-svg-icons'; // Import the view icon
import { useNavigate } from 'react-router-dom';

const ViewSelectedSubmission = () => {
  const [submissions, setSubmissions] = useState([]);
  const [editingSubmission, setEditingSubmission] = useState(null);
  const [editedSubmission, setEditedSubmission] = useState({
    submissionStatus: '',
    comment: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleEdit = (submissionId) => {
    // Find the submission to edit
    const submissionToEdit = submissions.find(submission => submission._id === submissionId);
    setEditingSubmission(submissionToEdit);
    // Clear editedSubmission state
    setEditedSubmission({
      submissionStatus: submissionToEdit.submissionStatus,
      comment: submissionToEdit.comment
    });
  };

  const handleStatusChange = (e) => {
    setEditedSubmission({
      ...editedSubmission,
      submissionStatus: e.target.value
    });
  };

  const handleCommentChange = (e) => {
    setEditedSubmission({
      ...editedSubmission,
      comment: e.target.value
    });
  };

  const handleSubmitEdit = async () => {
    try {
      // Make API call to update the submission
      await fetch(`http://localhost:5000/updateSubmission/${editingSubmission._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedSubmission)
      });
      // Clear editing state
      setEditingSubmission(null);
      setEditedSubmission({
        submissionStatus: '',
        comment: ''
      });

      // Refetch submissions to reflect the changes
      const response = await fetch('http://localhost:5000/allSelectedSubmissions');
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      } else {
        throw new Error(`Failed to fetch selected submissions: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating submission:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingSubmission(null);
    setEditedSubmission({
      submissionStatus: '',
    });
  };
  const handleView = (submissionId) => {
    // Navigate to the view detail submission route with submissionId parameter
    const params = new URLSearchParams(window.location.search);
    const username = params.get("username");
    navigate(`/manager/viewdetailsubmission/${submissionId}?username=${username}`);
  };
  
  useEffect(() => {
    const fetchSelectedSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:5000/allSelectedSubmissions');
        if (response.ok) {
          const data = await response.json();
          setSubmissions(data);
        } else {
          throw new Error(`Failed to fetch selected submissions: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error fetching selected submissions:', error);
      }
    };
    fetchSelectedSubmissions();
  }, []);

  return (
    <div className="status-page">
      <SideMenu />
      <div className="status-content">
        <h2 className="status-title">Submitted Magazines</h2>
        <div className="magazine-table-container">
          <table className="magazine-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Cover Image</th>
                <th>Student Name</th> 
                <th>Faculty</th>
                <th>Title</th>
                <th>Document</th>
                <th>Status</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={submission._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={`http://localhost:5000/uploads/${submission.coverImage}`} alt={`Image for ${submission.magazineTitle}`} className="submission-image" />
                  </td>
                  <td>{submission.studentName}</td>
                  <td>{submission.faculty}</td>
                  <td>{submission.magazineTitle}</td>
                  <td>
                    <a href={`http://localhost:5000/uploads/${submission.document}`} target="_blank" rel="noopener noreferrer" className="document-link">
                      <FontAwesomeIcon icon={faFilePdf} /> Download PDF
                    </a>
                  </td>
                  <td>{submission.submissionStatus}</td>
                  <td>{submission.comment}</td>
                  <td>
                    {editingSubmission && editingSubmission._id === submission._id ? (
                      <div>
                        <select value={editedSubmission.submissionStatus} onChange={handleStatusChange}>
                          <option value="Approved For Publication">Approved For Publication</option>
                          <option value="Rejected For Publication">Rejected For Publication</option>
                        </select>

                        <button className="save-button" onClick={handleSubmitEdit}>Save </button>
                        <button className="cancel-button" onClick={handleCancelEdit}>Cancel </button>
                        
                      </div>
                    ) : (
                      <div>
                        <button className="view-button" onClick={() => handleView(submission._id)} style={{ color:'blue'}}>
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewSelectedSubmission;

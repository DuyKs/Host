import React, { useState, useEffect } from 'react';
import './status.css';
import SideMenu from '../sideMenu/SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFilePdf, faTrash } from '@fortawesome/free-solid-svg-icons';
import SubmissionForm from '../submissionForm/SubmissionForm'; // Import the SubmissionForm component

const Status = () => {
  const [submissions, setSubmissions] = useState([]);
  const [editSubmission, setEditSubmission] = useState(null); // State to track the submission being edited

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const username = new URLSearchParams(window.location.search).get('username');
        const response = await fetch(`http://localhost:5000/fetchSubmission?username=${encodeURIComponent(username)}`);
        if (response.ok) {
          const data = await response.json();
          setSubmissions(data);
        } else {
          console.error('Failed to fetch submissions:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };
    fetchSubmissions();
  }, []);

  const handleEdit = (submissionId, submissionDate, submissionStatus, magazineTitle, magazineContent, comment, studentName, faculty) => {
    // Get the current date
    const currentDate = new Date();
  
    // Calculate the submission window end date (assuming submission window is open for 1 month)
    const submissionWindowEndDate = new Date(submissionDate);
    submissionWindowEndDate.setMonth(submissionWindowEndDate.getMonth() + 1);
  
    // Check if the current date is within the submission window
    if (currentDate <= submissionWindowEndDate) {
      // Allow editing only if the submission status is not "Approved For Publication"
      if (submissionStatus !== "Approved For Publication") {
        // Set the submission to edit
        setEditSubmission({
          _id: submissionId,
          submissionDate: new Date().toISOString(),
          submissionStatus,
          magazineTitle,
          magazineContent,
          comment,
          studentName,
          faculty
        });
      } else {
        // Submission is already approved for publication, cannot edit
        alert(`Submission with ID ${submissionId} is already approved for publication. Cannot edit.`);
      }
    } else {
      // Submission window has closed
      alert('Submission window has closed.');
    }
  };
  
  const handleDelete = async (submissionId, submissionStatus) => {
    if (submissionStatus !== "Approved For Publication") {
      // If the submission status is not "Approved For Publication", proceed with deletion
      try {
        const response = await fetch(`http://localhost:5000/deleteSubmission?id=${submissionId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          // Remove the deleted submission from the state
          setSubmissions(submissions.filter(submission => submission._id !== submissionId));
          alert(`Submission with ID ${submissionId} deleted successfully.`);
        } else {
          console.error('Failed to delete submission:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting submission:', error);
      }
    } else {
      // Submission is already approved for publication, cannot delete
      alert(`Submission with ID ${submissionId} is already approved for publication. Cannot delete.`);
    }
  };

  const handleCancelEdit = () => {
    // Cancel editing by resetting the editSubmission state
    setEditSubmission(null);
  };

  return (
    <div className="status-page">
      <SideMenu />
      <div className="status-content">
        <h2 className="status-title">Submitted Magazines</h2>
        {editSubmission ? ( // If editing, hide the table and show only the submission form
          <div className="edit-form-container">
            <SubmissionForm
              submissionToEdit={editSubmission}
              onCancelEdit={handleCancelEdit} // Pass onCancelEdit function to the SubmissionForm
            />
          </div>
        ) : ( // Otherwise, display the table
          <div className="magazine-table-container">
            <table className="magazine-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Document</th>
                  <th>Submission Date</th>
                  <th>Status</th>
                  <th>Comment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission, index) => (
                  <tr key={submission._id}>
                    <td>{index + 1}</td>
                    <td>{submission.magazineTitle}</td>
                    <td>{submission.magazineContent}</td>
                    <td>
                      <a href={`http://localhost:5000/uploads/${submission.document}`} target="_blank" rel="noopener noreferrer" className="document-link">
                        <FontAwesomeIcon icon={faFilePdf} /> Download PDF
                      </a>
                    </td>
                    <td>{new Date(submission.submissionDate).toLocaleString()}</td>
                    <td>{submission.submissionStatus}</td>
                    <td>{submission.comment}</td>
                    <td>
                      <button className="edit-button" onClick={() => handleEdit(submission._id, submission.submissionDate, submission.submissionStatus, submission.magazineTitle, submission.magazineContent, submission.comment, submission.studentName, submission.faculty)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(submission._id, submission.submissionStatus)}>
                        <FontAwesomeIcon icon={faTrash}  style={{ color: 'red' }}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;

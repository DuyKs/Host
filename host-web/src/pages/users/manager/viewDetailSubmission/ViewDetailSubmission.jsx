import React, { useState, useEffect } from 'react';
import './viewDetailSubmission.css';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom

const ViewDetailSubmission = () => {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState(null);
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");
  
  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        // Make a request to fetch submission data
        const response = await fetch(`http://localhost:5000/submissions/${submissionId}`);
        if (response.ok) {
          const data = await response.json();
          setSubmission(data);
        } else {
          throw new Error('Failed to fetch submission data');
        }
      } catch (error) {
        console.error('Error fetching submission data:', error);
      }
    };

    fetchSubmissionData();
  }, [submissionId]);

  if (!submission) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="submission-detail-container">
      <div className="submission-detail-header">
        <img src={`http://localhost:5000/uploads/${submission.coverImage}`} alt={submission.magazineTitle} className="submission-detail-cover" />
        <div className="submission-detail-info">
          <h2>{submission.magazineTitle}</h2>
          <p className="student-name">Student Name: {submission.studentName}</p>
          <p className="faculty">Faculty: {submission.faculty}</p>
        </div>
      </div>
      <div className="submission-detail-pdf">
        <iframe src={`http://localhost:5000/uploads/${submission.document}`} title="Submission PDF" className="pdf-viewer" />
      </div>
      <div className="submission-details">
        <p className="status">Submission Status: {submission.submissionStatus}</p>
        <p className="date">Submission Date: {new Date(submission.submissionDate).toLocaleString()}</p>
        <p className="comment">Comment: {submission.comment}</p>
        {/* Add a button to return to ManagerViewSubmission page */}
        <Link to={`/manager/viewsubmission?username=${username}`}>
          <button className="return-button">Return to View Submissions</button>
        </Link>
      </div>
    </div>
  );
};

export default ViewDetailSubmission;

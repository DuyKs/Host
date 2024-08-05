import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './magazineDetail.css'; // Import your CSS file for styling
import NavbarLogined from './navbarLogined/NavbarLogin';

const SubmissionDetail = () => {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const submissionId = urlParams.get('submissionId'); // Retrieve submissionId from URL params
  
        if (!submissionId) {
          throw new Error('Submission ID not found in URL');
        }
  
        // Make a request to your backend API to fetch submission data
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
  }, []);

  if (!submission) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="submission-navbar">
    <NavbarLogined />
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
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;

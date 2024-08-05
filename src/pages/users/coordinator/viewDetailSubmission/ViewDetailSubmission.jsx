import React, { useState, useEffect } from 'react';
import './viewDetailSubmission.css';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios

const ViewDetailSubmission = () => {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState(null);
  const [editedSubmission, setEditedSubmission] = useState({});
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [documentPreview, setDocumentPreview] = useState(null);
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");
  const navigate = useNavigate(); // Use useNavigate hook to access navigation functions

  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/submissions/${submissionId}`);
        if (response.status === 200) {
          const data = response.data;
          setSubmission(data);
          setEditedSubmission(data);
          setCoverImagePreview(`http://localhost:5000/uploads/${data.coverImage}`);
          setDocumentPreview(`http://localhost:5000/uploads/${data.document}`);
        } else {
          throw new Error('Failed to fetch submission data');
        }
      } catch (error) {
        console.error('Error fetching submission data:', error);
      }
    };

    fetchSubmissionData();
  }, [submissionId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSubmission({
      ...editedSubmission,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'text/plain'];
      if ((e.target.name === 'coverImage' && !allowedTypes.includes(file.type)) ||
          (e.target.name === 'document' && !allowedTypes.slice(2).includes(file.type))) {
        alert(`Only ${e.target.name === 'coverImage' ? 'JPEG, PNG' : 'PDF, DOC, TXT'} files are allowed.`);
        e.target.value = '';
        return;
      }

      setEditedSubmission({
        ...editedSubmission,
        [e.target.name]: file
      });
      if (e.target.name === 'coverImage') {
        setCoverImagePreview(URL.createObjectURL(file));
      } else if (e.target.name === 'document') {
        setDocumentPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      for (const key in editedSubmission) {
        formData.append(key, editedSubmission[key]);
      }
  
      console.log("Updated Submission Information:", editedSubmission);
      console.log(`Updating submission with ID: ${submissionId}`);
  
      const response = await axios.put(`http://localhost:5000/updateSubmissions/${submissionId || ''}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.status === 200) {
        console.log('Submission updated successfully');
        // Navigate back to the desired URL after successful submission update
        navigate(`/coordinator/viewsubmission?username=${username}`);
      } else {
        console.error('Failed to update submission:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating submission:', error);
    }
  };
  
  return (
    <div className="submission-detail-container">
      <div className="submission-detail-header">
        <img src={coverImagePreview} alt={submission?.magazineTitle} className="submission-detail-cover" />
        <div className="submission-detail-info">
          <input
            type="text"
            name="magazineTitle"
            value={editedSubmission.magazineTitle || submission?.magazineTitle || ''}
            onChange={handleInputChange}
          />
          <p className="student-name">Student Name: {submission?.studentName}</p>
          <p className="faculty">Faculty: {submission?.faculty}</p>
        </div>
      </div>
      <div className="submission-detail-pdf">
        <iframe src={documentPreview} title="Submission PDF" className="pdf-viewer" />
      </div>
      <div className="submission-details">
        <div>
          <label htmlFor="coverImage">Cover Image:</label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            onChange={handleFileChange}
            accept="image/jpeg, image/png" // Accept only JPEG and PNG files for cover image
          />
        </div>
        <div>
          <label htmlFor="document">Document:</label>
          <input
            type="file"
            id="document"
            name="document"
            onChange={handleFileChange}
            accept="application/pdf, application/msword, text/plain" // Accept only PDF, DOC, TXT files for document
          />
        </div>
        <div>
          <label htmlFor="magazineContent">Magazine Content:</label>
          <textarea
            id="magazineContent"
            name="magazineContent"
            value={editedSubmission.magazineContent || submission?.magazineContent || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="submissionStatus">Submission Status:</label>
          <select id="submissionStatus" name="submissionStatus" value={editedSubmission.submissionStatus || submission?.submissionStatus || ''} onChange={handleInputChange}>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Rejected For Publication">Rejected For Publication</option>
            <option value="Approved For Publication">Approved For Publication</option>
          </select>
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={editedSubmission.comment || submission?.comment || ''}
            onChange={handleInputChange}
          />
        </div>
        
        {/* Submit button */}
        <button onClick={handleSubmit} style={{ color: 'white' }}>Update Submission</button>

        {/* Add a button to return to ManagerViewSubmission page */}
        <Link to={`/coordinator/viewsubmission?username=${username}`}>
          <button className="return-button">Return to View Submissions</button>
        </Link>
      </div>
    </div>
  );
};

export default ViewDetailSubmission;

import React, { useState, useEffect } from 'react';
import './submissionForm.css'; // Import your CSS file for styling
import SideMenu from '../sideMenu/SideMenu';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

const SubmissionForm = ({ submissionToEdit }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // State for form fields, errors, and agreement to terms
  const [formData, setFormData] = useState({
    studentName: '',
    faculty: '',
    magazineTitle: '',
    magazineContent: '',
    coverImage: null,
    document: null,
    submissionDate: new Date().toISOString(), // Default submission date
    submissionStatus: 'pending', // Default submission status
  });
  const [formErrors, setFormErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showForm, setShowForm] = useState(true); // State to control form visibility

  // Update form data when submissionToEdit changes
  useEffect(() => {
    if (submissionToEdit) {
      setFormData(submissionToEdit);
    } else {
      setFormData({
        studentName: '',
        faculty: '',
        magazineTitle: '',
        magazineContent: '',
        coverImage: null,
        document: null,
        submissionDate: new Date().toISOString(), // Default submission date
        submissionStatus: 'pending', // Default submission status
      });
    }
  }, [submissionToEdit]);

  useEffect(() => {
    if (!submissionToEdit) {
      // Fetch student name and faculty based on username
      const searchParams = new URLSearchParams(window.location.search);
      const username = searchParams.get('username');
      if (username) {
        fetch(`http://localhost:5000/getFaculty?username=${username}`)
          .then(response => response.json())
          .then(data => {
            if (data.faculty) {
              setFormData(prevFormData => ({
                ...prevFormData,
                studentName: username,
                faculty: data.faculty
              }));
            } else {
              console.error('Faculty not found for username:', username);
            }
          })
          .catch(error => console.error('Error fetching faculty:', error));
      }
    }
  }, [submissionToEdit]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form data:', formData); // Log form data

    // Validate form fields and agreement to terms
    const errors = {};
    if (!formData.studentName.trim()) {
      errors.studentName = 'Student name is required';
    }
    if (!formData.magazineTitle.trim()) {
      errors.magazineTitle = 'Magazine title is required';
    }
    if (!formData.magazineContent.trim()) {
      errors.magazineContent = 'Magazine content is required';
    }
    if (!formData.coverImage) {
      errors.coverImage = 'Cover image is required';
    }
    if (!formData.document) {
      errors.document = 'Document is required';
    }
    if (!agreedToTerms) {
      errors.terms = 'You must agree to the terms and conditions';
    }
    if (Object.keys(errors).length === 0) {
      try {
        if (submissionToEdit) {
          // If submissionToEdit prop is provided, it means we are updating an existing submission
          // Form is valid, send data to backend for update
          const formDataToSend = new FormData();
          // Append form data to formDataToSend
          formDataToSend.append('studentName', formData.studentName);
          formDataToSend.append('faculty', formData.faculty);
          formDataToSend.append('magazineTitle', formData.magazineTitle);
          formDataToSend.append('magazineContent', formData.magazineContent);
          formDataToSend.append('coverImage', formData.coverImage);
          formDataToSend.append('document', formData.document);
          formDataToSend.append('submissionDate', formData.submissionDate); // Include submission date
          formDataToSend.append('submissionStatus', formData.submissionStatus); // Include submission status

          // Send formDataToSend to the server for update
          const response = await fetch(`http://localhost:5000/updateMagazine/${submissionToEdit._id}`, {
            method: 'PUT',
            body: formDataToSend,
          });

          if (response.ok) {
            console.log('Magazine updated successfully');
            window.location.reload(); // Refresh the page
          } else {
            console.error('Failed to update magazine:', response.statusText);
          }
        } else {
          // If submissionToEdit prop is not provided, it means we are creating a new submission
          // Form is valid, send data to backend for submission
          const formDataToSend = new FormData();
          // Append form data to formDataToSend
          formDataToSend.append('studentName', formData.studentName);
          formDataToSend.append('faculty', formData.faculty);
          formDataToSend.append('magazineTitle', formData.magazineTitle);
          formDataToSend.append('magazineContent', formData.magazineContent);
          formDataToSend.append('coverImage', formData.coverImage);
          formDataToSend.append('document', formData.document);
          formDataToSend.append('submissionDate', formData.submissionDate); // Include submission date
          formDataToSend.append('submissionStatus', formData.submissionStatus); // Include submission status

          // Send formDataToSend to the server for submission
          const response = await fetch('http://localhost:5000/submitMagazine', {
            method: 'POST',
            body: formDataToSend,
          });

          if (response.ok) {
            console.log('Magazine submitted successfully');
            // Reset form fields
            setFormData({
              studentName: '',
              faculty: '',
              magazineTitle: '',
              magazineContent: '',
              coverImage: null,
              document: null,
              submissionDate: new Date().toISOString(), // Reset submission date to current date
              submissionStatus: 'Pending', // Reset submission status to pending
            });
            // Navigate back to the status page
            navigate(`/Student/check-publish-status?username=${formData.studentName}`);
          } else {
            console.error('Failed to submit magazine:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Error submitting magazine:', error);
      }
    } else {
      // Set formErrors state to display error messages
      setFormErrors(errors);
    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, files } = e.target;
    if (files) {
      // No need to handle file changes here since Multer will handle it
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
    // Clear error message when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  // Function to format date and time in Hanoi timezone
  const formatSubmissionDate = () => {
    const submissionDate = new Date(formData.submissionDate);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Ho_Chi_Minh', // Hanoi timezone (Indochina Time - ICT)
    };
    return submissionDate.toLocaleString('en-US', options);
  };

  return (
    <div className="submission-form">
      <SideMenu />
      {showForm ? (
        <>
          <h2 className={submissionToEdit ? 'edit-heading' : 'submit-heading'}>
            {submissionToEdit ? 'Edit Your Magazine' : 'Submit Your Magazine'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="studentName">Username:</label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                readOnly={!submissionToEdit} // Disable user input for editing
              />
            </div>
            <div className="form-group">
              <label htmlFor="faculty">Faculty:</label>
              <input
                type="text"
                id="faculty"
                name="faculty"
                value={formData.faculty}
                readOnly={!submissionToEdit} // Disable user input for editing
              />
            </div>
            <div className="form-group">
              <label htmlFor="magazineTitle">Magazine Title:</label>
              <input
                type="text"
                id="magazineTitle"
                name="magazineTitle"
                value={formData.magazineTitle}
                onChange={handleChange}
              />
              {formErrors.magazineTitle && (
                <span className="error">{formErrors.magazineTitle}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="magazineContent">Magazine Content:</label>
              <textarea
                id="magazineContent"
                name="magazineContent"
                value={formData.magazineContent}
                onChange={handleChange}
              ></textarea>
              {formErrors.magazineContent && (
                <span className="error">{formErrors.magazineContent}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="coverImage">Cover Image:</label>
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                accept="image/*"
                onChange={handleChange}
              />
              {formData.coverImage && (
                <img src={URL.createObjectURL(formData.coverImage)} alt="Cover preview" width="75%" height="500px" className="preview" />
              )}
              {formErrors.coverImage && (
                <span className="error">{formErrors.coverImage}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="document">Document (PDF):</label>
              <input
                type="file"
                id="document"
                name="document"
                accept=".pdf"
                onChange={handleChange}
              />
              {formData.document && (
                <embed src={URL.createObjectURL(formData.document)} type="application/pdf" width="100%" height="500px" className="preview" />
              )}
              {formErrors.document && (
                <span className="error">{formErrors.document}</span>
              )}
            </div>
            {/* Include submission date */}
            <div className="form-group">
              <label htmlFor="submissionDate">Submission Date:</label>
              <input
                type="text"
                id="submissionDate"
                name="submissionDate"
                value={formatSubmissionDate()}
                readOnly // Make the input field read-only
              />
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  required // Make the checkbox required
                />
                I agree to the terms and conditions
              </label>
              {formErrors.terms && (
                <span className="error">{formErrors.terms}</span>
              )}
            </div>
            <button type="submit" style={{ color: 'white' }}>{submissionToEdit ? 'Update' : 'Submit'}</button>
          </form>
        </>
      ) : (
        <div>
          <h2>Submission Status</h2>
          <p>Status: {formData.submissionStatus}</p>
          <button onClick={() => setShowForm(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default SubmissionForm;

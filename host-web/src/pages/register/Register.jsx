import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BackGround } from './imports'; // Ensure this import is correct
import './register.css';


const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    agreeTerms: false
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data.message);
        // Redirect or perform other actions upon successful registration
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${BackGround})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      <div className="register-box">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
          </div>
          <div className="form-group">
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          </div>
          <div className="form-group">
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
          </div>
          <div className="form-group">
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" />
          </div>
          <div className="form-group">
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} /> Agree to Terms
            </label>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-register" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
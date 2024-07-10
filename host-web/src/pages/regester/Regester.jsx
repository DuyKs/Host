import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BackGround } from './imports'; // Ensure this import is correct
import './regester.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${BackGround})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      <div className="login-box">
        <h2>Register</h2>
        <form className="login-form">
          <div className="form-group">
            <input type="text" id="fullName" name="fullName" value={fullName} onChange={handleFullNameChange} placeholder="Full Name" />
          </div>
          <div className="form-group">
            <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} placeholder="Email" />
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
          </div>
          <div className="form-group">
            <input type="date" id="dateOfBirth" name="dateOfBirth" value={dateOfBirth} onChange={handleDateOfBirthChange} placeholder="Date of Birth" />
          </div>
          <div className="form-group">
            <select id="gender" name="gender" value={gender} onChange={handleGenderChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit" className="btn-login">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;

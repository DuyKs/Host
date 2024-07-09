import React from 'react';
import { Link } from 'react-router-dom';
import { BackGround, Icon } from './imports'; // Ensure this import is correct
import './registerSuccess.css';

const RegisterSuccess = () => {
  return (
    <div className="register-success-container"style={{ backgroundImage: `url(${BackGround})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      <div className="register-success-box">
      <img src={Icon} alt="Icon" className="Icon" /> {/* Include the image */}
        <h2>Registration Successful</h2>
        <p>Your account has been successfully created.</p>
        <Link to="/login" className="btn-login">Login</Link>
      </div>
    </div>
  );
};

export default RegisterSuccess;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackGround } from './imports';
import { FaArrowLeft } from 'react-icons/fa'; // Importing the left arrow icon
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Username and Password are required.');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Login successful:', data.message);
        console.log('User role:', data.user.role); // Log user role
        // Redirect to different routes based on the user's role
        switch (data.user.role) {
          case 'admin':
            navigate(`/admin/dashboard?username=${encodeURIComponent(formData.username)}`);
            break;
          case 'student':
            navigate(`/student/dashboard?username=${encodeURIComponent(formData.username)}`);
            break;
          case 'manager':
            navigate(`/manager/dashboard?username=${encodeURIComponent(formData.username)}`);
            break;
          case 'coordinator':
            navigate(`/coordinator/dashboard?username=${encodeURIComponent(formData.username)}`);
            break;
          case 'guest':
            navigate(`/library?username=${encodeURIComponent(formData.username)}`);
            break;
          default:
            // Handle unknown roles or other cases
            break;
        }
      } else {
        setError(data.message);
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
      <div className="nav-bar">
        <button className="back-button" onClick={() => navigate('/')}>
          <FaArrowLeft />
        </button>
      </div>
      <div className="login-box">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
          </div>
          <div className="form-group">
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

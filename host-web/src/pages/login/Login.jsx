import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BackGround } from './imports'; // Ensure this import is correct
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${BackGround})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      <div className="login-box">
        <h2>Login</h2>
        <form className="login-form">
          <div className="form-group">
            <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} onFocus={() => setUsername('')} placeholder="Username" />
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} onFocus={() => setPassword('')} placeholder="Password" />
          </div>
          <button type="submit" className="btn-login">Login</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import './Login.css'; // Import the CSS file with the styles

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (password === 'committee_members') {
      onLogin(true);
    } else {
      setErrorMessage('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Login;

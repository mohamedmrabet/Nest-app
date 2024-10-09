import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContainer } from '../../Api/Apicontainer.tsx';
import { Local } from "../../ApiLocal/ApiLocal.tsx";

const Login = ({ setUser }) => { 
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const Navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${Local.Api}${ApiContainer.USER.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed.');
      }

      const responseData = await response.json();
      console.log('Login successful:', responseData);
      const { id } = responseData;
      setUser(id);
      Navigate('/', { state: { iduser: id } });

    } catch (error: any) {
      setError(error.message || 'Login failed. Please try again.');
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick1 = () => {
    Navigate("/signup");
  };

  return (
    <div id="login-container">
      <div id="login-box">
        <div id="login-image">
          <img
            src='\src\assets\cart.jpg'
            alt="Login illustration"
          />
        </div>
        <div id="login-form-container">
          <h1 id="login-title">Login</h1>
          {error && <p id="login-error">{error}</p>}

          <form onSubmit={handleSubmit} id="login-form">
            <div id="email-field">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div id="password-field">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" id="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div style={{ paddingTop: "0.5cm", paddingLeft: "1cm", color: "red" }} onClick={handleClick1}>
              I Don't Have an account
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

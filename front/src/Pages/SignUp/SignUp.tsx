import { useState } from 'react';
import axios from 'axios';
import { ApiContainer } from '../../Api/Apicontainer.tsx';
import { Local } from "../../ApiLocal/ApiLocal.tsx"
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
    role: "user"
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const [success, setSuccess] = useState(''); 
const Navigate = useNavigate()
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
      const response = await fetch(`${Local.Api}${ApiContainer.USER.SIGN_UP}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Signup failed.');
      }
      const isResponseJson = response.headers.get("content-type")?.includes("application/json");

      if (isResponseJson) {
        const responseData = await response.json();
        console.log('Signup successful:', responseData);
        Navigate("/login")
      } else {
        console.log('Signup successful, no response body.');
      }

    } catch (error: any) {
      setError(error.message || 'Signup failed. Please try again.');
      console.error('Signup failed:', error);
    } finally {
      setLoading(false); 
    }
  };
const handleclick = ()=>{
  Navigate("/login")
}
  return (
    <div id="signup-container">
      <div id="signup-wrapper">
        <div id="signup-left">
          <img
            // src="https://via.placeholder.com/600x600"
            src='\src\assets\cart.jpg'
            alt="Signup illustration"
            id="signup-image"
          />
        </div>
        <div id="signup-right">
          <h1 id="signup-title">Sign Up</h1>
          {error && <p id="signup-error">{error}</p>}
          {success && <p id="signup-success">{success}</p>}

          <form onSubmit={handleSubmit} id="signup-form">
            <div id="name-field">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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

            <button
              type="submit"
              id="signup-button"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <div style={{paddingTop:"0.5cm",paddingLeft:"1cm",color:"green"}} onClick={handleclick}>
              I already have an account
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

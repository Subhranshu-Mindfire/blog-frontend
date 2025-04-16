import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Logout.css"

const Signup = () => {
  useEffect(() => {
      const isAuthenticated = localStorage.getItem('is_authenticated');
      if (isAuthenticated === 'true') {
        navigate('/');
      }
    }, []);

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
        user: {
          name,
          email,
          password,
        },
      });

      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSignup} className="container my-5 bg-white rounded-2" style={{ maxWidth: '400px' }}>
      <div className='px-3'>
        <div className="mt-5 pt-3 text-center fs-2 fw-semibold">Sign Up</div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-orange w-100 mb-4">Sign Up</button>
      </div>
    </form>
  );
};

export default Signup;

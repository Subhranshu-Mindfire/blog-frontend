import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/userContext';
import "./Logout.css"
import { useEffect } from 'react';

const Login = ({ setToken, toast }) => {
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('is_authenticated');
    if (isAuthenticated === 'true') {
      navigate('/');
    }
  }, []);
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    console.log(axios.defaults.headers)
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        user: {
          email,
          password,
        },
      });

      const { token, user } = res.data;
      setToken(token)

      localStorage.setItem('token', token);
      localStorage.setItem('username', user.name);
      localStorage.setItem('user_id', user.id);
      localStorage.setItem('is_authenticated', 'true');

      setCurrentUser({ id: user.id, name: user.name, token });
      
      toast.success('Login Successful!!!', {
              position: 'top-right',
              autoClose: 5000, 
      });

      navigate('/posts');
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <form onSubmit={handleLogin} className="container my-5 bg-white rounded-2" style={{ maxWidth: '400px' }}>
      <div className='px-3'>
        <div className="mt-5 pt-3 text-center fs-2 fw-semibold">Login</div>

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

        <button type="submit" className="btn btn-orange w-100 mb-4">Login</button>
      </div>
    </form>
  );
};

export default Login;

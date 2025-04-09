import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/userContext';

const Login = ({setToken}) => {
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
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
      navigate('/dashboard');
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <button type="submit">Login</button>


    </form>
  );
};

export default Login;

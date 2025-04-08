import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { currentUser, setCurrentUser } = useUser();

  const logout = () => {
    localStorage.clear();
    setCurrentUser(null);
  };

  return (
    <nav>
      <Link to="/">Home</Link> 
      {currentUser ? (
        <>
          <span>Welcome, {currentUser.name}</span> 
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
        </>
      )}

    </nav>
  );
};

export default Navbar;

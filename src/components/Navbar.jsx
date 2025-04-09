import { Link } from 'react-router-dom';
import { useUser } from '../context/userContext';
import Logout from './Logout';

const Navbar = () => {
  const { currentUser } = useUser();
  console.log(currentUser);
  
  return (
    <nav>
      <Link to="/">Home</Link> 
      {currentUser.id ? (
        <>
          <span>Welcome, {currentUser.name}</span> 
          <Logout/>
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

import { Link } from 'react-router-dom';
import { useUser } from '../context/userContext';
import Logout from './Logout';
import "./Navbar.css"
import "./Logout.css"

const Navbar = () => {
  const { currentUser } = useUser();
  console.log(currentUser);

  return (
    <nav className="navbar navbar-expand-lg px-3 bg-light fs-4 shadow-lg">
      <Link className="navbar-brand text-orange fs-3 fw-bolder" to="/">Vlog App</Link>
      <div className="collapse navbar-collapse ">
        <ul className="navbar-nav ms-auto">
          {currentUser.id ? (
            <>
              <li className="nav-item ">
                <span className="nav-link text-orange">Welcome, {currentUser.name}</span>
              </li>
              <li className="nav-item text-orange">
                <Logout />
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login"><button className='btn btn-orange fs-5'>Login</button></Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

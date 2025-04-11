import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import Logout from './Logout';
import "./Navbar.css"
import "./Logout.css"
import { ToastContainer } from 'react-toastify';


const Navbar = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate()
  console.log(currentUser);

  return (
    <>
      <nav className="navbar navbar-expand-lg px-3 bg-light fs-4 shadow-lg">
        <Link className="navbar-brand text-orange fs-3 fw-bolder" to="/">Blog App</Link>
        <ToastContainer/>
        <div className="collapse navbar-collapse ">
          <ul className="navbar-nav ms-auto">
            {currentUser.id ? (
              <>
                <li className="nav-item ">
                  <span className="nav-link text-orange mx-2">Welcome, {currentUser.name} &ensp; | </span>
                </li>
                <li className='nav-item mx-1'>
                  <button className="btn btn-orange mt-2 fs-6" type="button" onClick={() => navigate("/posts/new")}>Add Blog +</button>
                </li>
                <li className='nav-item mx-1'>
                  <button className="btn btn-orange mt-2 fs-6" type="button" onClick={() => navigate("/posts")}>All Blogs</button>
                </li>
                <li className='nav-item mx-1'>
                  <button className="btn btn-orange mt-2 fs-6" type="button" onClick={() => navigate("/posts/new")}>My Blogs</button>
                </li>
                <li className="nav-item text-orange mt-1">
                  <Logout />
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login"><button className='btn btn-orange fs-5'>Login</button></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup"><button className='btn btn-orange fs-5'>Signup</button></Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

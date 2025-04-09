import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { logoutUser } from '../utils/auth';
import "./Logout.css"


const Logout = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();

  const handleLogout = () => {
    console.log("Delete Clicked")
    logoutUser({ setCurrentUser, navigate });
    navigate("/login")
  };
  return (
    <button className="btn btn-orange ms-3 fs-5" onClick={() => { handleLogout() }}>Logout</button>
  )
}

export default Logout
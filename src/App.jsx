import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import { UserProvider } from './context/userContext';
import axios from 'axios';
import { useState } from 'react';
import Posts from './components/Posts';

const setHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log("Hii Header Saved",axios.defaults.headers)
  } else {
    delete axios.defaults.headers.common['Authorization'];
    console.log("Header Deleted")
  }
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  setHeader(token)

  
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setToken={setToken}/>} />
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/posts" element={<Posts/>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>


    </>
  );
};

export default App;

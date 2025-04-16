import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import { UserProvider } from './context/userContext';
import axios from 'axios';
import { useState } from 'react';
import Posts from './components/Posts';
import NewPost from './components/NewPost';
import Signup from './components/Signup';
import DetailedPost from './components/DetailedPost';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyBlogs from './components/MyBlogs';
import ProtectedRoute from './components/ProtectedRoutes';


const setHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log("Hii Header Saved", axios.defaults.headers)
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
    <ToastContainer/>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setToken={setToken} toast={toast} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<ProtectedRoute><DetailedPost/></ProtectedRoute>} />
            <Route path="/posts/new" element={<ProtectedRoute><NewPost /></ProtectedRoute>}/>
            <Route path="/users/:userId/posts" element={<ProtectedRoute><MyBlogs /></ProtectedRoute>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
};

export default App;

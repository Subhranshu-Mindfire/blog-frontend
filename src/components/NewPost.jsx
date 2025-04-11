import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Logout.css"
import { useNavigate } from 'react-router-dom';


const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/posts`, {
        post: { title, description: content }
      });
      
      toast.success('Blog Added !!', {
        position: 'top-right',
        autoClose: 5000, 
      });
      
      setTitle('');
      setContent('');
      console.log('Created Post:', response.data);
      navigate("/posts")
    } catch (error) {
      toast.error('Error creating post. Please try again!', {
        position: 'top-right',
        autoClose: 5000,
      });

      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fs-1 text-center">Create New Post</h2>
      <ToastContainer />

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fs-3">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label fs-3">Content</label>
          <textarea
            id="content"
            className="form-control"
            rows="15"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-lg btn-success m-auto">Post</button>
        </div>
      </form>

      
    </div>
  );
};

export default NewPost;

import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import "./Post.css"
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

dayjs.extend(relativeTime);

const DetailedPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState({})
  const [liked, setLiked] = useState();
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${id}`);
        setPost(response.data);
        setLiked(response.data.likedByUser)
        setLikesCount(response.data.noOfLikes)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    getPost();
  }, []);

 

  const userName = post.user?.name;
  const createdAt = dayjs(post.createdAt).fromNow();


  const handleLikeToggle = async () => {
    try {
      if (!liked) {
        await axios.post(`${import.meta.env.VITE_API_URL}/posts/${post.id}/likes`);
        setLikesCount(prev => prev + 1);
      } else {
        await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post.id}/likes/1`);
        setLikesCount(prev => prev - 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mb-3 shadow-lg post-card">
        <div className="card-body position-relative">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title">{post.title}</h5>
            <div className="text-end post-user">
              <span className="text-muted">- {userName} &ensp;</span>
            </div>
          </div>

          <p className="card-text mt-2">{post.description}</p>

          <div className="d-flex gap-3 fs-3 mb-1 align-items-center">
            <div role="button" onClick={handleLikeToggle}>
              {
                liked
                  ? <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
                  : <i className="fa-regular fa-heart"></i>
              } {likesCount}
            </div>

            <i className="fa-regular fa-comment" role="button"></i>
          </div>

          <div className="text-muted">{createdAt}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailedPost;

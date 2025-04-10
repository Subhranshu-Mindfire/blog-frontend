import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Post = ({ post }) => {
  console.log(post.likes)
  console.log(post.likes.some(like => like.user_id == localStorage.getItem("user_id")))
  const [liked, setLiked] = useState(post.likes.some(like => like.userId == localStorage.getItem("user_id")));
  const [likesCount, setLikesCount] = useState(post.noOfLikes || 0);

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
    <div className="card mb-3 shadow-sm">
      <div className="card-body position-relative">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title">{post.title}</h5>
          <div className="text-end">
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
  );
};

export default Post;

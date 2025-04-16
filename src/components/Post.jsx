import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import "./Post.css";

dayjs.extend(relativeTime);

const Post = ({ post, currentUser }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(post.likedByUser);
  const [likesCount, setLikesCount] = useState(post.noOfLikes || 0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);

  const userName = post.user?.name;
  const createdAt = dayjs(post.createdAt).fromNow();
  const isOwner = currentUser?.id == post.user?.id;

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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/posts/${post.id}`, {
        post: { title, description }
      });
      setShowEditModal(false);
      window.location.reload();
    } catch (err) {
      console.error("Edit failed", err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post.id}`);
      window.location.reload();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <>
      <div className="card mb-3 shadow-lg post-card">
        <div className="card-body position-relative">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title">{post.title}</h5>
            <div className="text-end post-user">
              <span
                className="text-muted"
                onClick={() => navigate(`/users/${post?.user?.id}/posts`)}
              >
                - <i className='name'>{userName}</i> &ensp;
                {isOwner && (
                  <>
                    <i className="fa-solid fa-pen fs-5" role="button" onClick={() => setShowEditModal(true)}></i> &ensp;
                    <i className="fa-solid fa-trash fs-5" style={{ color: "red" }} onClick={()=>{handleDelete()}}></i>
                  </>
                )}
              </span>
            </div>
          </div>

          <p className="card-text mt-2" onClick={() => navigate(`/posts/${post.id}`)}>{post.truncatedDescription}</p>

          <div className="d-flex gap-3 fs-3 mb-1 align-items-center">
            <div role="button" onClick={handleLikeToggle}>
              {
                liked
                  ? <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
                  : <i className="fa-regular fa-heart"></i>
              } {likesCount}
            </div>

            <div role="button" onClick={() => navigate(`/posts/${post.id}`)}>
              <i className="fa-regular fa-comment" role="button"></i> {post.comments.length}
            </div>
          </div>

          <div className="text-muted mb-2">{createdAt}</div>
        </div>
      </div>

      {showEditModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog w-75" role="document">
            <div className="modal-content">
              <form onSubmit={handleEditSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Blog</h5>
                  <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="editTitle" className="form-label">Title</label>
                    <input type="text" id="editTitle" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editDescription" className="form-label">Description</label>
                    <textarea id="editDescription" className="form-control" rows="10" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-orange">Save changes</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;

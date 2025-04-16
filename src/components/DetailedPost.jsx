import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import "./Post.css";
import { useParams, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

dayjs.extend(relativeTime);

const DetailedPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [liked, setLiked] = useState();
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const commentsPerPage = 3;

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${id}`);
        setPost(response.data);
        setLiked(response.data.likedByUser);
        setLikesCount(response.data.noOfLikes);
        setComments(response.data.comments || []);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    getPost();
  }, [id]);

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

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/posts/${post.id}/comments`, {
        description: newComment
      });
      setComments(prev => [...prev, response.data]);
      setNewComment("");
      setShowModal(false);
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const offset = currentPage * commentsPerPage;
  const currentComments = comments.slice(offset, offset + commentsPerPage);
  const pageCount = Math.ceil(comments.length / commentsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <div className="card mb-3 shadow-lg post-cards">
        <div className="card-body position-relative">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title">{post.title}</h5>
            <div className="text-end post-user">
              <span
                className="text-muted"
                role="button"
                onClick={() => navigate(`/users/${post?.user?.id}/posts`)}
              >
                - <i className='name'>{userName}</i> &ensp;
              </span>
            </div>
          </div>

          <p className="card-text mt-2">{post.description}</p>

          <div className="d-flex gap-3 fs-3 mb-1 align-items-center">
            <div role="button" onClick={handleLikeToggle}>
              {liked
                ? <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
                : <i className="fa-regular fa-heart"></i>} {likesCount}
            </div>

            <div role="button">
              <i className="fa-regular fa-comment" onClick={() => setShowModal(true)}></i> {comments.length}
            </div>
          </div>

          <div className="text-muted">{createdAt}</div>
        </div>
      </div>

      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <h6 className="card-title fw-bolder fs-5">Comments</h6>
          {currentComments.length === 0 ? (
            <p className="text-muted">No comments yet.</p>
          ) : (
            currentComments.map((comment) => (
              <div key={comment.id} className="mb-2 ms-2">
                <strong>{comment?.username}-</strong>
                <p className="mb-1"><i>"{comment.description}"</i></p>
                <small className="text-muted">{dayjs(comment.createdAt).fromNow()}</small>
                <hr />
              </div>
            ))
          )}

          {comments.length > commentsPerPage && (
            <ReactPaginate
              previousLabel={"← Prev"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center mt-3"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add a Comment</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <textarea
                  className="form-control"
                  rows="4"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your comment..."
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-orange" onClick={handleCommentSubmit}>
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedPost;

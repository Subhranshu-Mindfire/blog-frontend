import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import ReactPaginate from 'react-paginate';
import './pagination.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const postsPerPage = 2;
  const offset = currentPage * postsPerPage;
  const currentPosts = posts.slice(offset, offset + postsPerPage);
  const pageCount = Math.ceil(posts.length / postsPerPage);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
        setPosts(response.data);
        console.log("all posts", response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="container-xxl mt-4" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4">Posts</h2>
      {currentPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      <ReactPaginate
        previousLabel={"← Prev"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center mt-4"}
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
    </div>
  );
};

export default Posts;

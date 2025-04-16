import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Post from './Post';
import { useUser } from '../context/userContext';

const MyBlogs = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const { currentUser } = useUser();

  useEffect(() => {
    const fetchMyPosts = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}/posts`);
      setPosts(res.data);
    };
    fetchMyPosts();
  }, [userId]);

  console.log(posts)

  return (
    <div className="container mt-4" style={{ maxWidth: "900px" }}>
      {posts.length != 0 ? (
        <h2 className="mb-4">{posts?.[0]?.user?.name}'s Blogs</h2>
      ) : (
        <h2 className="mb-4 text-center">No Blogs Available</h2>
      )}
      
      {posts.map(post => (
        <Post key={post.id} post={post} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default MyBlogs;

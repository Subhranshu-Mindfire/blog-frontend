
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Post = ({ post }) => {
  console.log(post)
  const userName = post.user?.name
  const createdAt = dayjs(post.createdAt).fromNow(); 
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body position-relative">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title">{post.title}</h5>
          <div className="text-end">
            <span className="text-muted">{userName} &ensp;</span>
            
          </div>
        </div>
        <p className="card-text mt-2">{post.description}</p>
        <span className="text-muted">{createdAt}</span>
      </div>
      
    </div>
  );
};

export default Post;

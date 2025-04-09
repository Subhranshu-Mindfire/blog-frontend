import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Posts = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    try {
          const getPosts = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`)
            console.log(response)
            setPosts(response.data.posts)
        }
        getPosts() 
    } catch (error) {
      console.log(error)
    }
    
    
  }, [])
  
  return (
    <>
    <div>Posts</div>
      {posts.map((post)=>{
        return( 
        <ul>
          <li>{post.title}</li>
          <li>{post.description}</li>
        </ul>)
      })}
    </>
  )
}

export default Posts
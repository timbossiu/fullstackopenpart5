import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const addLike = (blog) => {
    console.log('adding like to blog', blog)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    blogService.modifyBlog(updatedBlog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={() => setVisible(true)}>view</button> 
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={() => addLike(blog)}>like</button></p>
        <button onClick={() => setVisible(false)}>hide</button>
        <p>{blog.user ? blog.user.name : 'no user'}</p>
      </div> 
    </div> 
  )}

export default Blog
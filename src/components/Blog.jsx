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
  const [localBlog, setBlog] = useState(blog)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const addLike = (blog) => {
    console.log('adding like to blog', blog)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    blogService.modifyBlog(updatedBlog).then(returnedBlog => {
      setBlog(returnedBlog)
    }).catch(error => {
      console.error('Error updating blog:', error)
    })
  }

  return (
    <div style={blogStyle}>
      <div>
        {localBlog.title} {localBlog.author} <button onClick={() => setVisible(true)}>view</button> 
      </div>
      <div style={showWhenVisible}>
        <p>{localBlog.url}</p>
        <p>likes {localBlog.likes} <button onClick={() => addLike(localBlog)}>like</button></p>
        <button onClick={() => setVisible(false)}>hide</button>
        <p>{localBlog.user ? localBlog.user.name : 'no user'}</p>
      </div> 
    </div> 
  )}

export default Blog
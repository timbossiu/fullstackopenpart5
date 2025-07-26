import { useState } from 'react'
import blogService from '../services/blogs'

import PropTypes from 'prop-types'

const Blog = ({ blog, currentUser, removeBlog }) => {

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
  const isUserOwner = localBlog.user && localBlog.user.name === currentUser.name
  const showWhenUserIsOwner = { display: isUserOwner ? '' : 'none' }

  blogService.setToken(currentUser.token)

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

  const deleteBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog.id).then(() => {
        removeBlog(blog)
      }).catch(error => {
        console.error('Error deleting blog:', error)
      })
    }
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
        <div style={showWhenUserIsOwner}>
          <button onClick={() => deleteBlog(localBlog)}>delete</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')  

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: newAuthor,
      title: newTitle,
      url: newUrl
    })
    
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
        <label>title:</label>
        <input
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}/>
        </div>
        <div>
        <label>author:</label>
        <input
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}/>
        </div>
        <div>
        <label>url:</label>
        <input
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}/>
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm


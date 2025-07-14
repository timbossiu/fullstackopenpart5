import Togglable from "./Togglable"

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
    <Togglable buttonLabel="view" buttonLabelHide="hide"></Togglable>
  </div>  
)

export default Blog
import { Link } from "react-router-dom"

const User = ({user}) => {
    if (!user) {
        return null
    }
    const blogs = user.blogs
  return (
    <div>
        <h1>{user.name}</h1>
        <p></p>
        <b>added blogs</b>
        {blogs.map(blog =>
            <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          )}
    </div>
  )
}

export default User
import { Link } from "react-router-dom"

const Users = ({users}) => {
    if (!users) {
        return null
    }
  return (
    <div>
        <h1>Users</h1>
        <p></p>
        <b>blogs created</b>
        {users.map(user =>
            <div key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}</Link> {user.blogs.length}
            </div>
          )}
    </div>
  )
}

export default Users
import { Link } from "react-router-dom"

const Menu = (user) => {

    return (
        <span>
            <Link to="/blogs">blogs</Link> <Link to="/users">users</Link>
        </span> 
    )
}

export default Menu
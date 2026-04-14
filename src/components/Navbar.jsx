import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/authSlice'
import "./navbar.css"

function Navbar() {
const dispatch = useDispatch()
const navigate = useNavigate()
const { isAuthenticated, user } = useSelector((state) => state.auth)

const handleLogout = () => {
dispatch(logout())
navigate('/login')
}

return (
<nav className='navbar navbar-expand-lg navbar-dark bg-primary navbar-custom'>
<div className='container'>

{/* Logo */}
<Link className='navbar-brand fw-bold' to='/'>
City Events
</Link>

{/* Links */}
<div className='collapse navbar-collapse'>
<ul className='navbar-nav ms-auto'>

{/* Events */}
<li className='nav-item'>
<Link className='nav-link custom-btn' to='/events'>Events</Link>
</li>

{isAuthenticated ? (
<>
<li className='nav-item'>
<Link className='nav-link custom-btn' to='/dashboard'>
👤 {user?.name}
</Link>
</li>
<li className='nav-item'>
<button
className='custom-btn border-0'
onClick={handleLogout}
>
Logout
</button>
</li>
</>
) : (
<>
<li className='nav-item'>
<Link className='nav-link custom-btn' to='/login'>Login</Link>
</li>
<li className='nav-item'>
<Link className='nav-link custom-btn' to='/register'>Register</Link>
</li>
</>
)}

</ul>
</div>
</div>
</nav>
)
}

export default Navbar
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const logoutHandler = () => {
        logout()
        navigate('/', {replace: true})
    }

    return ( 
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                <span>Links Application</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/create'>Create</NavLink></li>
                    <li><NavLink to='/links'>Links</NavLink></li>
                    <li><a onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;
import { NavLink } from 'react-router-dom'
import libraryIcon from '../assets/icons/library.png'
import logo from '../assets/icons/logo.jpg'

export function AppNavBar() {

    return (
        <aside className='side-navbar'>
            <ul className='nav-bar'>
                <li className='nav-link-logo '>
                    <a href='/'>
                        <img className='logo-img' src={logo} />
                    </a>
                </li>
                <li className='nav-link'>
                    <a href='/'>
                        <i className="fa-solid fa-house"></i>
                        <span>Home</span>
                    </a>
                </li>
                <li className='nav-link'>
                    <NavLink to='/search'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <span>Search</span>
                    </NavLink>
                </li>
                <li className='nav-link'>
                    <NavLink to="/library">
                        <img className='icon' src={libraryIcon} />
                        <span>Your Library</span>
                    </NavLink>

                </li>
                <li className='nav-link'>
                    <NavLink to="/create">
                    <i className="fa-solid fa-square-plus"></i>
                        <span>Create Playlist</span>
                    </NavLink>

                </li>
                <li className='nav-link'>
                    <NavLink to="/liked">
                        <i className="fa-solid fa-heart"></i>
                        <span>Liked Songs</span>
                    </NavLink>

                </li>
            </ul>
        </aside>
    )
}
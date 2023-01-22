import { NavLink } from 'react-router-dom'
import homeIcon from '../assets/icons/home.png'
import searchIcon from '../assets/icons/search.png'
import libraryIcon from '../assets/icons/library.png'
import heartIcon from '../assets/icons/heart.png'
import addIcon from '../assets/icons/add.png'
import logo from '../assets/icons/logo.jpg'

export function AppNavBar() {

    return (
        <aside className='side-navbar'>
            <ul className='nav-bar'>
                <li className='nav-link-logo'>
                    <a href='/'>
                        <img className='logo' src={logo} />
                    </a>
                </li>
                <li className='nav-link'>
                    <a href='/'>
                        <i class="fa-solid fa-house"></i>
                        <span>Home</span>
                    </a>
                </li>
                <li className='nav-link'>
                    <NavLink to='/search'>
                        <i class="fa-solid fa-magnifying-glass"></i>
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
                    <i class="fa-solid fa-square-plus"></i>
                        <span>Create Playlist</span>
                    </NavLink>

                </li>
                <li className='nav-link'>
                    <NavLink to="/liked">
                        <i class="fa-solid fa-heart"></i>
                        <span>Liked Songs</span>
                    </NavLink>

                </li>
            </ul>
        </aside>
    )
}
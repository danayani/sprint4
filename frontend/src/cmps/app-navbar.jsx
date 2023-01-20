import { NavLink } from 'react-router-dom'
import homeIcon from '../assets/icons/home.png'
import searchIcon from '../assets/icons/search.png'
import libraryIcon from '../assets/icons/library.png'

export function AppNavBar() {
    return (
        <aside className='side-navbar main-container'>
            <ul className='nav-bar'>
                <li className='nav-link'>
                    <a href='/'>
                        <img className='icon' src={homeIcon} />
                        <span>Home</span>
                    </a>
                </li>
                <li className='nav-link'>
                    <a href='/search'>
                        <img className='icon' src={searchIcon} />
                        <span>Search</span>
                    </a>
                </li>
                <li className='nav-link'>
                    <NavLink to="/library">
                        <img className='icon' src={libraryIcon} />
                        <span>Your Library</span>
                    </NavLink>

                </li>
            </ul>
        </aside>
    )
}
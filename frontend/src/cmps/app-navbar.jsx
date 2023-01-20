import { NavLink } from 'react-router-dom'
import homeIcon from '../assets/icons/home.png'
import searchIcon from '../assets/icons/search.png'
import libraryIcon from '../assets/icons/library.png'
import heartIcon from '../assets/icons/heart.png'
import addIcon from '../assets/icons/add.png'

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
                <li className='nav-link'>
                    <NavLink to="/create">
                        <img className='icon' src={addIcon} />
                        <span>Create Playlist</span>
                    </NavLink>

                </li>
                <li className='nav-link'>
                    <NavLink to="/liked">
                        <img className='icon' src={heartIcon} />
                        <span>Liked Songs</span>
                    </NavLink>

                </li>
            </ul>
        </aside>
    )
}
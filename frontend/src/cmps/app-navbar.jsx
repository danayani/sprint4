// Navigation to different pages 

import { NavLink } from 'react-router-dom'
// import logo from '../assets/img/spotify-logo.png'

//230px
//can be showen as grid with 1 clu
export function AppNavBar() {
    

    return (
        <aside className='side-navbar'>
            <ul className='nav-bar'>
                <li className='nav-link'>
                    <a href='/'>
                        <img src='assets/icon/home.png' />
                        <span className=''>Home</span>
                    </a>
                </li>
                <li className='nav-link'>
                    <a href='/search'>
                        <img src='assets/icon/search.png' />
                        <span className=''>Search</span>
                    </a>
                </li>
                <li className='nav-link'>
                    <a href='/library'>
                        <img src='assets/icon/library.png'/>
                        <span className=''>Your Library</span>
                    </a>
                </li>

            </ul>
        </aside>
    )
}













{/* {logo}
<nav>
    <NavLink className="nav-link" to={"/"}>Home</NavLink>
    <NavLink className="nav-link" to={"/search"}>Search</NavLink>
    <NavLink className="nav-link" to={"/library"}>Your Library</NavLink>
</nav> */}
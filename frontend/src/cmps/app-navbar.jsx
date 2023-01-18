// Navigation to different pages 

import { NavLink } from 'react-router-dom'
// import logo from '../assets/img/spotify-logo.png'

//230px
//can be showen as grid with 1 clu
export function AppNavBar() {
    return (
        <aside className='side-navbar'>
            <nav>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/search"}>Search</NavLink>
                <NavLink to={"/library"}>Your Library</NavLink>
            </nav>
        </aside>
    )
}
import { NavLink, Link } from 'react-router-dom'
import logo from '../assets/icons/logo.jpg'
import { loadStations } from '../store/station/station.actions.js'
import { useSelector } from "react-redux"
import { useEffect } from 'react'

export function AppNavBar() {

    const stations = useSelector((storeState) => storeState.stationModule.stations)

    useEffect(() => {
        loadStations()
        
    }, [])

    return (
        <aside className='side-navbar'>
            <ul className='nav-bar'>
                <li key="logo" className='nav-list-logo '>
                    <a href='/'>
                        <img className='logo-img' src={logo} />
                        Melody
                    </a>
                </li>
                <li key="home" className='nav-list'>
                    <NavLink to='/'>
                        <svg role="img" height="24" width="24" aria-hidden="true" className="icon Svg-sc-ytk21e-0 uPxdw home-icon" viewBox="0 0 24 24" data-encore-id="icon"><path d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.732V21a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2 2 0 011-1.732l7.5-4.33z"></path>
                            <path fill="currentColor" d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.732V21a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2 2 0 011-1.732l7.5-4.33z"></path></svg>
                        Home
                    </NavLink>
                </li>
                <li key="search" className='nav-list'>
                    <NavLink to='/search'>
                        <svg role="img" height="24" width="24" aria-hidden="true" className="icon Svg-sc-ytk21e-0 uPxdw search-icon" viewBox="0 0 24 24" data-encore-id="icon"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
                            <path fill="currentColor" d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path></svg>
                        Search
                    </NavLink>
                </li>
                <li key="library" className='nav-list'>
                    <NavLink to="/library">
                        <svg role="img" height="24" width="24" aria-hidden="true" className="icon Svg-sc-ytk21e-0 uPxdw collection-icon" viewBox="0 0 24 24" data-encore-id="icon"><path d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z"></path>
                            <path fill="currentColor" d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z"></path></svg>
                        Your Library
                    </NavLink>
                </li>
                <li key="create" className='nav-list create'>
                    <NavLink to="/create-station">
                        <i className="icon fa-solid fa-square-plus"></i>
                        Create Playlist
                    </NavLink>
                </li>
                <li key="liked" className='nav-list like'>
                    <NavLink to="/liked-songs">
                        <div className='icon like-box'>
                            <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" className="vg-sc-ytk21e-0 uPxdw"><path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
                                <path fill="currentColor" d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path></svg>
                        </div>
                        Liked Songs
                    </NavLink>
                </li>
            </ul>
            <div className='nav-list-seperator'>
            </div>
            {stations && stations?.length > 0 &&
                <div className='user-station-list'>
                    <ul className='user-station-list-ul'>
                        {stations.map(station =>
                            <NavLink key={station._id} to={`/${station._id}`}>
                                <div className="user-station-list-link">
                                    <h3>{station.name}</h3>

                                </div>
                            </NavLink>
                        )}
                    </ul>
                </div>
            }

        </aside>
    )
}
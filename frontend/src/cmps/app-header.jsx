
// import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom"
// import { logout } from '../store/user/user.actions.js'
import { useState } from 'react'
import { youtubeService } from "../services/youtube.service.js"

export function AppHeader() {
    // const user = useSelector((storeState => storeState.userModule.user))
    const location = useLocation()

    const navigate = useNavigate()
    const [txtSearchPlaceHolder, setTxtSearchPlaceHolder] = useState('What do you want to listen to ?')
    const [txtSearchKey, setTxtSearchKey] = useState('')

    const [searchSongs, setSearchSongs] = useState([])

    // const search = useRef(utilService.debounce(getSongsFromSearch,500))

    // async function getSongsFromSearch(value) {
    //     if(!value.length) {
    //         setTxtSearchPlaceHolder([])
    //         return
    //     }
    // }

    // function onLogoutUser() {
    //     navigate('/')
    //     logout()
    // }

    function onGo(diff) {
        navigate(diff)
    }

    function handleChange({ target }) {
        let { value } = target
        setTxtSearchKey(value)
    }

    function onSearch() {
        console.log('onSearch', txtSearchKey)
        youtubeService.getServerSideSearch(txtSearchKey).then(res => {
            let songs = res
            console.log('youtubeService', songs)
            // setSearchSongs(songs)
        })
    }

    return (
        <div className="top-bar-container">
            <header className="app-header">
                <div>
                    <button className="go-btn" onClick={() => onGo(-1)}>
                        <svg role="img" height="16" width="16" aria-hidden="true" className="go-btn Svg-sc-ytk21e-0 kcBZLg IYDlXmBmmUKHveMzIPCF" viewBox="0 0 16 16" data-encore-id="icon"><path d="M11.03.47a.75.75 0 010 1.06L4.56 8l6.47 6.47a.75.75 0 11-1.06 1.06L2.44 8 9.97.47a.75.75 0 011.06 0z"></path>
                            <path d="M11.03.47a.75.75 0 010 1.06L4.56 8l6.47 6.47a.75.75 0 11-1.06 1.06L2.44 8 9.97.47a.75.75 0 011.06 0z"></path></svg>
                    </button>
                </div>

                {location.pathname === '/search' &&
                    <div className='searchInput-container flex'>
                        <button className="search-key-btn" onClick={onSearch}>
                            <svg role="img" height="24" width="24" aria-hidden="true" className="search-key Svg-sc-ytk21e-0 uPxdw mOLTJ2mxkzHJj6Y9_na_" viewBox="0 0 24 24" data-encore-id="icon"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
                                <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path></svg>
                        </button>
                        <form onSubmit={onSearch}>
                            <input className='search-key-input' type="text"
                                name="searchKey"
                                value={txtSearchKey}
                                placeholder={txtSearchPlaceHolder}
                                onChange={handleChange} />
                        </form>
                    </div>}

                {/* {(user) ?
                    <div onClick={onLogoutUser}>
                        {user.fullname}
                    </div>
                    :
                    <div>
                        {!user && <NavLink to="/login-signup/login">Sign In</NavLink>}
                        {!user && <NavLink to="/login-signup/signup">Sign Up</NavLink>}
                    </div>
                } */}
            </header>
        </div>
    )
}
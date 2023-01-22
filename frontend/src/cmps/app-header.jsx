// navigate arrows + user options
//TODO : add link to about page
//acording to the url (page) the headder change
import { useSelector } from 'react-redux';
import left from '../assets/icons/left.png';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from '../store/user/user.actions.js'
import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service';

export function AppHeader() {
    const user = useSelector((storeState => storeState.userModule.user))
    const location = useLocation()
    console.log('location', location.pathname)

    const navigate = useNavigate()
    const [txtSearchPlaceHolder, setTxtSearchPlaceHolder] = useState('What do you want to listen to ?')
    const [txtSearchKey, setTxtSearchKey] = useState('')
    // const search = useRef(utilService.debounce(getSongsFromSearch,500))

    // async function getSongsFromSearch(value) {
    //     if(!value.length) {
    //         setTxtSearchPlaceHolder([])
    //         return
    //     }
    // }
    function onLogoutUser() {
        navigate('/')
        logout()
    }

    function onGo(diff) {
        navigate(diff)
    }

    function handleChange({ target }) {
        let { value } = target
        // let { name: field, value } = target
        console.log('setTxtSearchKey', value)
        setTxtSearchKey(value)
        // setTxtSearchKey(prevTxt => ({ ...prevTxt, [field]: value }))
        // search.current(value)
    }

    function onSearch() {
        console.log('onSearch')
    }

    return (
        <div className="top-bar-container">
            <header className="app-header">
                <div>

                    <button className="go-btn" onClick={() => onGo(-1)}>
                        <img className='btn-icon' src={left} />
                    </button>
                </div>

                {location.pathname == '/search' &&
                    <div className='searchInput-container flex'>
                        <button className="search-key-btn">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <form onSubmit={onSearch}>
                            <input className='search-key-input' type="text"
                                name="searchKey"
                                value={txtSearchKey}
                                placeholder={txtSearchPlaceHolder}
                                onChange={handleChange} />
                        </form>
                    </div>}


                {(user) ?
                    <div onClick={onLogoutUser}>
                        {user.fullname}
                    </div>
                    :
                    <div>
                        {!user && <NavLink to="/login-signup/login">Sign In</NavLink>}
                        {!user && <NavLink to="/login-signup/signup">Sign Up</NavLink>}
                    </div>
                }
            </header>
        </div>
    )
}
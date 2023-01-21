// navigate arrows + user options
//TODO : add link to about page
//acording to the url (page) the headder change
import { useSelector } from 'react-redux';
import left from '../assets/icons/left.png';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from '../store/user/user.actions.js'
import { useEffect, useState } from 'react'

export function AppHeader() {
    const user = useSelector((storeState => storeState.userModule.user))
    const [currPage, setCurrPage] = useState(window.location.href)
    const location = useLocation()
    console.log('location', location.pathname)

    const navigate = useNavigate()

    // useEffect(() => {
    //     setCurrPage = window.location.href
    // },[window.location.href])

    function onLogoutUser() {
        logout().then(() => {
            user = null
        })
    }

    function onGo() {
        navigate(-1)
    }

    return (
        <div className="top-bar-container">
            <header className="app-header">
                <div>
                    <button className="go-btn" onClick={() => onGo(-1)}>
                        <img className='btn-icon' src={left} />
                    </button>
                </div>
                {location.pathname == '/search' && <input placeholder=' What do you want to listen to ?'></input>
                    // <input> </input>
                    
                }



                {(user) ?
                    <div onClick={onLogoutUser}>
                        {user.fullname}
                    </div>
                    :
                    <div>
                        {!user && <NavLink to="/login-signup">Sign In</NavLink>}
                        {!user && <NavLink to="/login-signup">Sign Up</NavLink>}
                    </div>
                }
            </header>
        </div>
    )
}
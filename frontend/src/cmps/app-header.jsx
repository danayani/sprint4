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
    const location = useLocation()
    console.log('location', location.pathname)

    const navigate = useNavigate()
    const [txtSearchPlaceHolder, setTxtSearchPlaceHolder] = useState('What do you want to listen to ?')
    const [newTxtNote, setTxtNewNote] = useState('')

    // useEffect(() => {
    //     setCurrPage = window.location.href
    // },[window.location.href])

    function onLogoutUser() {
        navigate('/')
        logout()
    }

    function onGo(diff) {
        navigate(diff)
    }



    function handleChange({ target }) {
        let { value } = target
        setTxtNewNote(value)
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
                    <form>
                        <input placeholder=' What do you want to listen to ?'></input>
                        <button>🔍</button>
                    </form>}

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
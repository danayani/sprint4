// navigate arrows + user options
//TODO : add link to about page
//acording to the url (page) the headder change
import { useSelector } from 'react-redux';
import left from '../assets/icons/left.png';
import right from '../assets/icons/right.png';
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from '../store/user/user.actions.js'

export function AppHeader() {
    const user = useSelector((storeState => storeState.userModule.user))
    const navigate = useNavigate()


    function onLogoutUser() {
        logout().then(() => {
            user = null
        })
    }

    function onGo(diff) {
        navigate(diff)
    }

    return (
        <div className="top-bar-container">
            <header className="app-header">
                <div>

                    <button className="go-btn" onClick={() => onGo(-1)}>
                        <img className='btn-icon' src={left} />
                    </button>
                    <button className="go-btn" onClick={() => onGo(1)}>
                        <img className='btn-icon' src={right} />
                    </button>
                </div>
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
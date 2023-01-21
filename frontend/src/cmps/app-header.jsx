// navigate arrows + user options
//TODO : add link to about page
//acording to the url (page) the headder change
import { useSelector } from 'react-redux';
import left from '../assets/icons/left.png';
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from '../store/user/user.actions.js'

export function AppHeader() {
    const user = useSelector((storeState => storeState.userModule.user))
    const navigate = useNavigate()


    function onLogoutUser() {
        navigate('/')
        logout()
    }

    // function onGo() {
    //     navigate(-1)
    // }

    return (
        <div className="top-bar-container">
            <header className="app-header">
                <div>
                    <button className="go-btn" onClick={() => navigate(-1)}>
                        <img className='btn-icon' src={left} />
                    </button>
                </div>
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
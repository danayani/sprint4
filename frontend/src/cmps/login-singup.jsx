import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { NavLink, useNavigate, useParams } from 'react-router-dom'

import { userService } from '../services/user.service'
import { login, signup, logout } from '../store/user/user.actions'
import { SET_USER } from "../store/user/user.reducer"

const defaultCredentials = {
    username: '',
    email: '',
    password: '',
    fullname: ''
}

export function LoginSignup() {
    const [credentials, setCredentials] = useState(defaultCredentials)
    const [isSignup, setIsSignup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { signupUser } = useParams()

    useEffect(() => {
        if (signupUser === 'login') setIsSignup(false)
        else setIsSignup(true)
    }, [signupUser])

    function setUser(user) {
        dispatch({ type: SET_USER, user })
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prevCred) => ({ ...prevCred, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        if (isSignup) {
            signup({ ...credentials, fullname: credentials.fullname })
                .then(() => {
                    console.log('success from signup user')
                    navigate('/')
                })
                .catch(err => {
                    console.log('error from signup user')
                })
        } else {
            login(credentials)
                .then(() => {
                    console.log('success from login user')
                    navigate('/')
                })
                .catch(err => {
                    console.log('error from login user')
                })
        }
    }

    function onToggleSignupUser(ev) {
        ev.preventDefault()
        setIsSignup(!isSignup)
    }

    return (
        <section className="login-signup">
            <div className="login-user">
                {isSignup ?
                    <h3>Sign up</h3>
                    :
                    <h3>Sign in</h3>
                }
            </div>
            <form className="form-login" onSubmit={onSubmit}>
                <label>
                    User Name:
                    <input type="text" name="username" value={credentials.value} placeholder="username" onChange={handleChange} required />
                </label>
                <label>
                    E-mail
                    <input type="email" name="email" value={credentials.email} placeholder="Enter your E-mail here..." onChange={handleChange} required />
                </label>
                <label>
                    Password
                    <input type="password" name="password" value={credentials.password} placeholder="Enter your password here..." onChange={handleChange} required />
                </label>
                {isSignup &&
                    <label>
                        Full Name
                        <input type="text" name="fullname" value={credentials.fullname} placeholder="Enter your full name here..." onChange={handleChange} required />
                    </label>
                }
                <button className="btn-login-signup">{isSignup ? 'Sign up' : 'Sign in'}</button>
                {/* <NavLink to='' */}
                <a href="#" onClick={onToggleSignupUser}>
                    {isSignup ? 'Are you a member? Sign in' : 'New in town? Sign up'}
                </a>
            </form>
        </section>
    )
}
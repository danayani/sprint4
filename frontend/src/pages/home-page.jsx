import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/img/logo.png'
import { CHANGE_COUNT } from '../store/user.reducer'

export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)

    function changeCount(diff) {
        console.log('Changing count by:', diff);
        dispatch({ type: CHANGE_COUNT, diff })
    }

    return (
        <section>
            <h2>Home-page</h2>
        </section >
    )
}
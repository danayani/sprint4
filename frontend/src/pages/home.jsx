// Display of all playlists
import React from 'react'
import { StationList } from '../cmps/station-list'
export function HomePage() {
    return (
        <section className='home'>
            <h2>good morning</h2>
            <h2>playlists</h2>
            <StationList/>
        </section >

    )
}
// Display of all playlists
import React from 'react'
import { StationList } from '../cmps/station-list'

export function Home() {
    // data retrival
    // const stations = useSelector((storeState) => storeState.stationModule.stations)

    return (
        <section className='home'>
            <h2>good morning</h2>
            <h2>playlists</h2>
            <StationList
            // stations={stations}
            />
        </section >

    )
}
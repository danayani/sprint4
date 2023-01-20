// Display of all playlists
import { useEffect } from 'react'
import { useSelector } from "react-redux"

import { StationList } from '../cmps/station-list'
import { loadStations } from '../store/station/station.actions.js'

export function Home() {
    // data retrival
    const stations = useSelector((storeState) => storeState.stationModule.stations)
console.log('stations from home', stations)
    useEffect(() => {
        loadStations()
    }, [])

    function setGreeting() {
        const currHour = new Date().getHours()
        if (currHour >= 6 && currHour <= 12) return 'Good morning'
        else if (currHour > 12 && currHour <= 17) return 'Good afternoon'
        else if (currHour > 17 && currHour <= 22) return 'Good evning'
        else if (currHour > 22 || currHour < 6) return 'Good night'
    }


    return (
        <section className='home'>
            <h2>{setGreeting()}</h2>
            <StationList stations={stations} />
        </section >

    )
}
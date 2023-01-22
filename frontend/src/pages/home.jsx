// Display of all playlists
import { useEffect } from 'react'
import { useSelector } from "react-redux"

import { FirstStationList } from '../cmps/first-stations-list'
import { SecondStationList } from '../cmps/second-stations-list'
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
        else if (currHour > 17 && currHour <= 22) return 'Good evening'
        else if (currHour > 22 || currHour < 6) return 'Good night'
    }

    // home-container stations-container
    return (
        <main className='main-home-container'>
            <div className="home-stations-container">
                <h1>{setGreeting()}</h1>
                <FirstStationList stations={stations.slice(0, 6)} />
                {/* better name is needed */}
                <SecondStationList stations={stations.slice(6, Infinity)}/>
            </div>
        </main >

    )
}
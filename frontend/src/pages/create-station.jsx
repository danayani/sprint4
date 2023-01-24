import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { saveStation } from '../store/station/station.actions'
import { Station } from "./station-details"

// import { StationDetails } from "../cmps/station-details"
import { userService } from "../services/user.service.js"
import { stationService } from "../services/station.service.js"
import { StationDetails } from "../pages/station-details.jsx"

// userService.getUserLikedStationsLength()

export function CreateStation() {
    const navigate = useNavigate()
    const [station, setStation] = useState(null)

    useEffect(() => {
        const newStation = (createEmptyStation())
        setStation(newStation)
    }, [])

    async function createEmptyStation() {
        const newStation = await saveStation(stationService.getEmptyStation())
        setStation(newStation)
    }

    // async function loadStation() {
    //     const currStation = stationService.getById(stationId)
    //     setStation(currStation)
    // }

    async function onSaveStation(station) {
        try {
            if (!station.name) station.name = 'My Playlist'
            await saveStation(station)
            navigate('/')
        } catch (err) {
            console.log('cannot save station', err)
            throw err
        }
    }

    if (!station) return <h1>Loading...</h1>
    return (
        <section>
            <StationDetails />
            
        </section>
    )
}
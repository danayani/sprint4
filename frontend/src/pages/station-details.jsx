import { useEffect, useState } from "react"
// import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"

import { SongList } from '../cmps/song-list'
import { StationHeader } from '../cmps/station-header'
import { stationService } from '../services/station.service'
import { updateStation, removeStation } from "../store/station/station.actions"

// all logic happends here

export function StationDetails({ saveStation }) {

    const [station, setStation] = useState(null)
    const { stationId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        // if (!stationId) setStation(stationService.getEmptyStation())
       //פניה אל ה-statiםn action והוא מעדכן את הרידוסר ואת הסטור
        loadStation()
    }, [stationId])

    async function loadStation() {
        const currStation = await stationService.getById(stationId)
        setStation(currStation)
    }

    function onSaveStation() {
        saveStation(station)
    }

    async function onRemoveStation(stationId) {
        await removeStation(station)
        navigate('/')
    }

    if (!station) return <h1>Loading...</h1>
    return (
        <section className="station">
            <StationHeader  />
            <SongList />
        </section>
    )
}
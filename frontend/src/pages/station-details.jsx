import { useEffect, useState } from "react"
// import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"

import { SongList } from '../cmps/song-list'
import { StationHeader } from '../cmps/station-header'
import { stationService } from '../services/station.service'
import { updateStation, removeStation } from "../store/station/station.actions"
import loader from "../assets/icons/loader.svg"

export function StationDetails({ saveStation }) {

    const [station, setStation] = useState(null)
    const { stationId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
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

    if (!station) return <div><img src={loader} /></div>
    return (
        <section className="station">
            <StationHeader />
            <SongList />
        </section>
    )
}
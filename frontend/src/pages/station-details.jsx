import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { SongList } from '../cmps/song-list'
import { StationHeader } from '../cmps/station-header'
import { stationService } from '../services/station.service'
import { updateStation, removeStation } from "../store/station/station.actions"
import loader from "../assets/icons/loader.svg"
import { saveStation, removeStation, loadCurrStation } from "../store/station/station.actions"

export function StationDetails({ saveStation, onAddSong}) {

    const [station, setStation] = useState(null)
    const { stationId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(stationId) loadStation(stationId)
        // else 

    }, [stationId])

    function handleChange(field, val) {
        setStation(prevStation => ({ ...prevStation, [field]: val }))
    }

    async function deleteStation(stationId) {
        await removeStation(stationId)
        navigate('/')
    }

    async function updateStation() {
        await saveStation(station)
      }

    function onSaveStation() {
        saveStation(station)
    }

    async function onDeleteSong(songId) {
        if (station.songs.length === 0) return
        else {
            const updatedStation = await stationService.remove(station._id, songId)
            setStation(updatedStation)
        }
    }

    if (!station) return <div><img src={loader} /></div>
    return (
        <section className="station-details">
            <StationHeader station={station} handleChange={handleChange} deleteStation={deleteStation} updateStation={updateStation} onSaveStation={onSaveStation} />
            <SongList station={station} onDeleteSong={onDeleteSong} handleChange={handleChange} onAddSong={onAddSong}/>
        </section>
    )
}
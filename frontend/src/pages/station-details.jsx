import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { SongList } from '../cmps/song-list'
import { StationHeader } from '../cmps/station-header'
import { stationService } from '../services/station.service'
import loader from "../assets/icons/loader.svg"
import { saveStation, removeStation, loadCurrStation } from "../store/station/station.actions"

export function StationDetails() {

    const [station, setStation] = useState(null)
    const { stationId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (stationId) loadStation()
        // else 

    }, [stationId])

    function loadStation() {
        stationService.getById(stationId).then(res => {
            setStation(res)
        })
            .catch((err) => {
                console.error(err)
            })
    }
    function handleChange(field, val) {
        // setStation(prevStation => ({ ...prevStation, [field]: val }))
    }

    async function deleteStation(stationId) {
        //TODO : only if user = creator
        await removeStation(stationId)
        navigate('/')
    }

    async function updateStation() {
        await saveStation(station)
    }

    function onSaveStation() {
        saveStation(station)
    }

    async function onRemoveSong(songId) {
        if (station.songs.length === 0) return
        else {
            const updatedStation = await stationService.remove(station._id, songId)
            setStation(updatedStation)
        }
    }

    function addToLikedSong(songId) {
        console.log('addToLikedSong')
    }

    if (!station) return <div><img src={loader} /></div>
    return (
        <section className="station-details">
            <StationHeader station={station} handleChange={handleChange} deleteStation={deleteStation} updateStation={updateStation} onSaveStation={onSaveStation} />
            <SongList station={station} onRemoveSong={onRemoveSong} addToLikedSong={addToLikedSong} />
        </section>
    )
}
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { saveStation } from "../store/station/station.actions"
import { stationService } from "../services/station.service"
import { StationDetails } from "../pages/station-details.jsx"
import { SearchYoutube } from "../cmps/search-youtube.jsx"


export function CreateStation() {
    const navigate = useNavigate()
    const [stationSongs, setStationSongs] = useState(station.songs)
    const [station, setStation] = useState(null)

    useEffect(() => {
        const newStation = (createEmptyStation())
        setStation(newStation)
    }, [])

    async function createEmptyStation() {
        const newStation = await saveStation(stationService.getEmptyStation())
        setStation(newStation)
    }

    async function onSaveStation(station) {
        try {
            if (!station.name) station.name = 'My Playlist'
            await saveStation(station)
            navigate('/')
        } catch (err) {
            console.error('cannot save station', err)
            throw err
        }
    }

    function handleChange(field, val) {
        setStation(prevStation => ({ ...prevStation, [field]: val }))
    }

    function onAddSong(song) {
        setStationSongs(prevSongs => [...prevSongs, song])
        handleChange('songs', [...stationSongs, song])
    }

    if (!station) return <h1>Loading...</h1>
    return (
        <main className="create-station-container">
            <StationDetails onAddSong={onAddSong} />
            <SearchYoutube onAddSong={onAddSong} isSearchingSongs={true}/>
        </main>
    )
}
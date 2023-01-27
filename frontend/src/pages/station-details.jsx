import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { SongList } from '../cmps/song-list'
import { StationHeader } from '../cmps/station-header'
import { stationService } from '../services/station.service'
import { addStation, updateStation, removeStation, loadCurrStation } from "../store/station/station.actions"
import { Loader } from "../cmps/loader"
import { loadCurrPlayingStation } from "../store/player/player.action.js"
import { SET_SONG_IDX, LOAD_STATION_FOR_PLAYER  } from "../store/player/player.reducer.js";

export function StationDetails() {

    const [station, setStation] = useState(null)
    const { stationId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (stationId) loadStation()

    }, [stationId])

    function loadStation() {
        stationService.getById(stationId).then(res => {
            setStation(res)
        })
            .catch((err) => {
                console.error(err)
            })
    }

    function playStation() {
        console.log('from station to player')
        loadCurrPlayingStation(stationId)
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
        await updateStation(station)
    }

    function onSaveStation() {
        addStation(station)
    }

    async function onRemoveSong(songId) {
        console.log('onRemoveSong',songId )
        // if (station.songs.length === 0) return
        // else {
        //     const updatedStation = await stationService.remove(station._id, songId)
        //     setStation(updatedStation)
        // }
    }


    function onPlaySong(songIdx) {
        playStation()
        dispatch({type:SET_SONG_IDX, songIdx})
    }

    function addToLikedSong(songId) {
        console.log('addToLikedSong')
    }

    if (!station) return <Loader />
    return (
        <section className="station-details">
            <StationHeader station={station} playStation={playStation} handleChange={handleChange} deleteStation={deleteStation} updateStation={updateStation} onSaveStation={onSaveStation} />
            <SongList station={station} onPlaySong={onPlaySong} onRemoveSong={onRemoveSong} addToLikedSong={addToLikedSong} />
        </section>
    )
}
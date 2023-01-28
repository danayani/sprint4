import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { SongList } from '../cmps/song-list'
import { StationHeader } from '../cmps/station-header'
import { stationService } from '../services/station.service'
import { addStation, updateStation, removeStation, loadCurrStation } from "../store/station/station.actions"
import { Loader } from "../cmps/loader"
import { loadCurrPlayingStation } from "../store/player/player.action.js"
import { SET_SONG_IDX, LOAD_STATION_FOR_PLAYER } from "../store/player/player.reducer.js";


export function LikedSongs() {
    const [stationId, setStationId] = useState('111RDtaf0Y86Q4hby91hqs6NX')
    const [station, setStation] = useState(null)
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

    function onPlaySong(songIdx) {
        playStation()
        dispatch({ type: SET_SONG_IDX, songIdx })
    }

    function toggleLikedSong(songId) {
        console.log('toggleLikedSong')
    }

    if (!station) <Loader />
    else return (
        <section className="station-liked-songs-container">
            <h1>hi from liked songs</h1>
            {console.log('station ♥', station)}
            <StationHeader station={station} playStation={playStation} />
            <SongList station={station} onPlaySong={onPlaySong} toggleLikedSong={toggleLikedSong} />
        </section>

    )
}
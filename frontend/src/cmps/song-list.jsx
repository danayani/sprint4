import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { stationService } from "../services/station.service.js"
import { SHOW_MSG } from "../services/event-bus.service.js";
import { LOAD_STATION_FOR_PLAYER } from "../store/player/player.reducer.js";

export function SongList() {
    const { stationId } = useParams()
    const [stationSongs, setStationSongs] = useState([])
    useEffect(() => {
        loadSongs()
    }, [])

    function loadSongs() {
        stationService.getById(stationId).then(res => {
            const songsList = res.songs
            setStationSongs(songsList)
        })
            .catch((err) => {
                console.error('Had issues in song list', err)
            })
    }

    function onPlay(songId) {
        LOAD_STATION_FOR_PLAYER(stationId, songId)
    }

    if (!stationSongs || !stationSongs.length) return <h1> loading...</h1>
    return (<div className="song-list-container" >
        <header className="header-song-list grid">
            <span>#</span>
            <span>TITLE</span>
            <span>DATE ADDED</span>
            <span><i className="song-list-tbodyTime fa-regular fa-clock"></i></span>
        </header>
        <ul>
            {stationSongs.map((song,idx) => {
                return <article role="button">
                    <li className="song-list-li grid">
                        <div className="btn-song-list-play">
                            {idx+1}
                        </div>
                        <section>
                            <div >
                                <img className="song-list-img" src={song.imgUrl} />
                            </div>
                            <section>
                                <p>{song.title}</p>
                            </section>
                        </section>
                        <div className="song-list-artist">
                            {song.createdBy}
                        </div>
                        <div className="song-list-add-date">
                            {song.addedAt}
                        </div>
                        <div className="song-list-duration">
                            00:00
                        </div>
                    </li>
                </article>
            })
            }
        </ul>
    </div>
    )
}
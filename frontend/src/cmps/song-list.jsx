import { useEffect, useState } from "react";
import { stationService } from "../services/station.service.js"
import { LOAD_STATION_FOR_PLAYER } from "../store/player/player.reducer.js";

export function SongList({ station, onRemoveSong, addToLikedSong }) {

    const [songs, setSongs] = useState([])

    useEffect(() => {
        loadSongs()
    }, [])

    function loadSongs() {
        setSongs(station.songs)
    }

    function onPlay(songId) {
        // LOAD_STATION_FOR_PLAYER(stationId, songId)
    }

    if (!songs || !songs.length) <h1> loading...</h1>
    return (
        <div className="song-list-container" >
            <header className="header-song-list grid">
                <span>#</span>
                <span>TITLE</span>
                <span>DATE ADDED</span>
                <span><i className="song-list-tbodyTime fa-regular fa-clock"></i></span>
            </header>
            <ul>
                {songs.map((song, idx) => {
                    return <article role="button" key={song.id}>
                        <li key={song.id} className="song-list-li grid">
                            <div className="btn-song-list-play">
                                {idx + 1}
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

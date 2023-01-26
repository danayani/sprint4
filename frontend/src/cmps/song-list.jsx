import { useEffect, useState } from "react";
import { stationService } from "../services/station.service.js"
import { LOAD_STATION_FOR_PLAYER } from "../store/player/player.reducer.js";


export function SongList({ station, onRemoveSong, addToLikedSong, onPlaySong }) {

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


    // if (!songs || !songs.length) <h1></h1>
    return (
        <div className="song-list-container" >
            <header className="header-song-list grid">
                <span>#</span>
                <span>TITLE</span>
                <span>DATE ADDED</span>
                <span></span>
                <span><i className="song-list-tbodyTime fa-regular fa-clock"></i></span>
            </header>
            <ul>
                {console.log("songs",songs)}
                {songs.map((song, idx) => {
                    
                    return <article  key={song.id}>
                        <li key={song.id} className="song-list-li grid">
                            <div className="btn-song-list-play">
                                {idx + 1}
                            </div>
                            <section role="button" onClick={() => onPlaySong(idx)} className="song-details">
                                <div >
                                    <img className="song-list-img" src={song.imgUrl} />
                                </div>
                                <section>
                                    <p>{song.title}</p>
                                </section>
                                <div className="song-list-artist">
                                    {song.createdBy}
                                </div>
                            </section>
                            <div className="song-list-add-date">
                                {song.addedAt}
                            </div>
                            <button className="add-song-station song-action">
                                ♥
                            </button>
                            <div className="song-list-duration">
                                00:00
                            </div>
                            <button className="remove-song-from-station song-action">
                                X
                            </button>
                        </li>
                    </article>
                })
                }
            </ul>
        </div>
    )
}

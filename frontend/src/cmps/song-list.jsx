import { useEffect, useState } from "react";
import { stationService } from "../services/station.service.js"
import { useDispatch } from "react-redux"
import { SET_SONG_IDX, LOAD_STATION_FOR_PLAYER } from "../store/player/player.reducer.js";
import { updateStation, actionToggleSongToLikedSong } from "../store/station/station.actions.js";

export function SongList({ station, playStation }) {



    const [songs, setSongs] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        loadSongs()
    }, [])

    function loadSongs() {
        setSongs(station.songs)
    }

    function onPlaySong(songIdx) {
        playStation()
        dispatch({ type: SET_SONG_IDX, songIdx })
    }

    async function onRemoveSongFronStation(songIdx) {
        console.log('onRemoveSongFronStation')
        console.log(songs[songIdx])
        songs.splice(songIdx, 1)
        setSongs(prev => [...prev])
        updateStation(station)
    }

    function toggleLikedSong(song) {
        console.log('toggleLikedSong')
        actionToggleSongToLikedSong(song)

    }

    
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
                {songs.map((song, idx) => {
                    console.log('is liked ♥ ', song.liked )
                    const classSvgLiked = (song.liked) ? 'song-liked-svg' : 'song-dis-liked-svg'
                    return <article key={song.id}>
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
                            <button className="add-song-station song-action " onClick={() =>toggleLikedSong(song)}>
                                <svg id="song-liked-svg" className={classSvgLiked} role="img" height="24" width="24" aria-hidden="true" >
                                    <path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
                                </svg>
                            </button>
                            <div className="song-list-duration">
                                00:00
                            </div>
                            <button className="remove-song-from-station song-action" onClick={() => onRemoveSongFronStation(idx)}>
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

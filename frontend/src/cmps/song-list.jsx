import { useEffect, useState } from "react";
import { stationService } from "../services/station.service.js"
import { useDispatch } from "react-redux"
import { SET_SONG_IDX, LOAD_STATION_FOR_PLAYER  } from "../store/player/player.reducer.js";
import { updateStation } from "../store/station/station.actions.js";

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
        dispatch({type:SET_SONG_IDX, songIdx})
    }

    async function onRemoveSongFronStation(songIdx) {
        console.log('onRemoveSongFronStation' )
        console.log(songs[songIdx])
        songs.splice(songIdx,1)
        console.log('afterRemove ', songs)

        updateStation(station)
    }

    function toggleLikedSong() {
        console.log('toggleLikedSong' )
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
                            <button className="add-song-station song-action" onClick={toggleLikedSong}>
                                ♥
                            </button>
                            <div className="song-list-duration">
                                00:00
                            </div>
                            <button className="remove-song-from-station song-action" onClick={() =>onRemoveSongFronStation(idx)}>
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

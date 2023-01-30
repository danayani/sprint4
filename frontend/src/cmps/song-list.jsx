import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { stationService } from "../services/station.service.js"
import { SET_SONG_IDX, LOAD_STATION_FOR_PLAYER } from "../store/player/player.reducer.js";
import { updateStation, actionToggleSongToLikedSong } from "../store/station/station.actions.js";
import { utilService } from "../services/util.service.js";

export function SongList({ station, playStation }) {

    const stationPlayer = useSelector(storeState => storeState.playerModule.currPlayingStation)
    const songIdxPlayer = useSelector(storeState => storeState.playerModule.currSongIdx)
    const location = useLocation()
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
        const update = await updateStation(station)
        setSongs(prev => [...prev])
    }

    async function toggleLikedSong(song) {
        console.log('toggleLikedSong')

        const update = await actionToggleSongToLikedSong(song)
        console.log('update', update)
        setSongs(prev => [...prev])
    }


    function onMouseSongLine(determ) {
        // setSongActionShowen(determ)
    }

    return (
        <div className={"song-list-container"} >
            <header className="header-song-list grid">
                <span>#</span>
                <span>TITLE</span>
                <span>DATE ADDED</span>
                <span></span>
                <span><i className="song-list-tbodyTime fa-regular fa-clock"></i></span>
            </header>
            <ul>
                {songs.map((song, idx) => {
                    const classSvgLiked = (song.liked) ? 'song-liked-svg' : 'song-dis-liked-svg'
                    const titleSvgLiked = (!song.liked) ? 'add to Liked Songs' : 'remove from Liked Songs'
                    return <li key={song.id} className="song-list-li grid" onMouseOver={() => onMouseSongLine(1)} onMouseOut={() => onMouseSongLine(0)}>
                            <div className="btn-song-list-play">
                                {idx + 1}
                            </div>
                            <section role="button" title="Play" onClick={() => onPlaySong(idx)} className="song-details">
                                <div >
                                    <img className="song-list-img" src={song.imgUrl} />
                                </div>
                                <div className="song-info">
                                    <div className="song-list-title">
                                        <p>{song.title}</p>
                                    </div>
                                    <div className="song-list-artist">
                                        {song.createdBy}
                                    </div>
                                </div>
                            </section>
                            <div className="song-list-add-date">
                                {utilService.timeConverter(song.addedAt)}
                            </div>
                            <button className="add-song-station song-action " title={titleSvgLiked} onClick={() => toggleLikedSong(song)}>
                                <svg id="song-liked-svg" className={classSvgLiked} role="img" height="24" width="24" aria-hidden="true" >
                                    <path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
                                </svg>
                            </button>
                            <div className="song-list-duration">
                                {utilService.getTimeFromSeconds(song.duration)}
                            </div>
                            <button className="remove-song-from-station song-action" onClick={() => onRemoveSongFronStation(idx)}>
                                X
                            </button>
                    </li>
                })
                }
            </ul>
        </div >
    )
}

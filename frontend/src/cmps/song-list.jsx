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
        console.log('song from toggle: ',song)
        

        const update = await actionToggleSongToLikedSong(song)
        setSongs(prev => [...prev])
    }


    function onMouseSongLine(determ) {
        // setSongActionShowen(determ)
    }

    return (
        <div className={"song-list-container"} >
            <header className="header-song-list grid">
                <span className="hash">#</span>
                <span>TITLE</span>
                <span>DATE ADDED</span>
                <span></span>
                <span><i className="song-list-tbodyTime fa-regular fa-clock"></i></span>
            </header>
            <ul>
                {songs.map((song, idx) => {
                    const classSvgLiked = (song.liked) ? 'song-liked-svg' : 'song-dis-liked-svg'
                    const titleSvgLiked = (!song.liked) ? 'add to Liked Songs' : 'remove from Liked Songs'
                    const colorTitle = (stationPlayer?.songs?.[songIdxPlayer]?.id === song.id) ? `#1ed760` : `#ffffff`
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
                                    <p style={{ color: colorTitle }}>{song.title}</p>
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
                                {(song.liked) ?
                                    <path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
                                    :
                                    <path d="M 1.69 2 A 4.582 4.582 0 0 1 8 2.023 A 4.583 4.583 0 0 1 11.88 0.817 h 0.002 a 4.618 4.618 0 0 1 3.782 3.65 v 0.003 a 4.543 4.543 0 0 1 -1.011 3.84 L 9.35 14.629 a 1.765 1.765 0 0 1 -2.093 0.464 a 1.762 1.762 0 0 1 -0.605 -0.463 L 1.348 8.309 A 4.582 4.582 0 0 1 1.689 2 Z m 3.158 0.252 A 3.082 3.082 0 0 0 2.49 7.337 l 0.005 0.005 L 7.8 13.664 a 0.264 0.264 0 0 0 0.311 0.069 a 0.262 0.262 0 0 0 0.09 -0.069 l 5.312 -6.33 a 3.043 3.043 0 0 0 0.68 -2.573 a 3.118 3.118 0 0 0 -2.551 -2.463 a 3.079 3.079 0 0 0 -2.612 0.816 l -0.007 0.007 a 1.501 1.501 0 0 1 -2.045 0 l -0.009 -0.008 a 3.082 3.082 0 0 0 -2.121 -0.861 Z"></path>
                                }
                            </svg>
                        </button>
                        <div className="song-list-duration">
                            {utilService.getTimeFromSeconds(song.duration)}
                        </div>
                        <button className="remove-song-from-station song-action" onClick={() => onRemoveSongFronStation(idx)}>
                            <i className="fa-solid fa-trash song-remove-icon "></i>
                        </button>
                    </li>
                })
                }
            </ul>
        </div >
    )
}

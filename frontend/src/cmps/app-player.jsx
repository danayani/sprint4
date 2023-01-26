import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"
import ReactPlayer from 'react-player/youtube'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { playerService } from '../services/player.service'
import { utilService } from '../services/util.service'
import { getActionPlayPausePlayer, loadCurrPlayingStation } from '../store/player/player.action'
import { SET_SONG_IDX, SET_REPEAT_SONG, SET_VOLUME } from '../store/player/player.reducer'
import { func } from 'prop-types'


export function AppPlayer() {
    const dispatch = useDispatch()

    const playerState = useSelector(storeState => storeState.playerModule.playerState)
    const station = useSelector(storeState => storeState.playerModule.currPlayingStation)
    const songIdx = useSelector(storeState => storeState.playerModule.currSongIdx)

    const [song, setSong] = useState(null)
    const [songShuffle, setSongShuffle] = useState(null)
    const [songDuration, setSongDuration] = useState({ duration: 0, curr: 0, untilDone: 0 })
    const[timelineSongTimeoutId, setTimelineSongTimeoutId] = useState()

    useEffect(() => {
        loadSong()
    }, [station, songIdx])

    function loadSong() {
        if (!station) return
        const songUrl = station.songs.map(song => song.url)[songIdx || 0]
        setSong(songUrl)
    }

    function handleVolumeChange({ target }) {
        let volume = target.value
        console.log('volume changed', volume)
        dispatch({ type: SET_VOLUME, volume })
    }

    function onShuffleSongs() {
        //אני צריכה להעביר את כל השירים מאוביקט למערך
        console.log('Shuffle isnt perfect yet')
    }

    function onReady(songProp) {
        console.log(songProp)
        startTimelinsSong(songProp)
        // loadSongDuration
        // console.log('seekTo()', x.seekTo(230)) //go to were you want, in sec

    }

    function startTimelinsSong(songProp) {
        console.log('songDuration', songDuration)

        // let durSong = songProp.getDuration()
        // setTimelineSongTimeoutId(setTimeout(updateSongTimeline, 100))
    }

    function updateSongTimeline() {

        // setSongDuration({
        //     duration: durSong,
        //     curr: curr+1,
        //     untilDone: curr - duration
        // })
        console.log('songDuration curr', songDuration.curr)

    }

    function onPreviosSong() {
        if (!station) return
        if (songIdx === 0) {
            songIdx = 0 //need to start play from 1sec
        }
        else {
            dispatch({ type: SET_SONG_IDX, songIdx: songIdx - 1 })
        }
    }

    function onNextSong() {
        if (!station) return
        if (songIdx === station.length - 1) {
            songIdx = station.length - 1 //need to start play from 1sec
        }
        else {
            dispatch({ type: SET_SONG_IDX, songIdx: songIdx + 1 })
        }
    }

    function onRepeat() {
        dispatch({ type: SET_REPEAT_SONG })
    }

    const classPlayPause = (!playerState.playing) ? 'play-pause-btn fa-solid fa-circle-play' : 'play-pause-btn fa-solid  fa-circle-pause'
    const classPlayRepeat = (!playerState.loop) ? 'action-btn fa-solid fa-repeat' : 'action-btn fa-solid fa-repeat btn-action-active'
    if (!playerState) return
    return (
        <section className="app-playerS">
            {/* {console.log('my station', station.songs[songIdx].title)} */}
            {song &&
                < ReactPlayer className="player-video"
                    height="1px"
                    url={song}
                    pip={playerState.pip}
                    playing={playerState.playing}
                    controls={playerState.controls}
                    volume={playerState.volume}
                    muted={playerState.muted}
                    duration={playerState.duration}
                    loop={playerState.loop}
                    onReady={onReady}
                />
            }
            <div className="app-playerS flex">
                <div className="song-details flex">
                    {console.log('playerState', playerState)}
                    <img className="song-img" src={station?.songs[songIdx]?.imgUrl} />
                    <p className="song-title">{station?.songs[songIdx]?.title}</p>
                </div>
                <div className="player-actions-container grid justify-center">
                    <div className="player-actions flex">
                        <button className='btn-action-player btn-shuffle-songs' onClick={onShuffleSongs} >
                            <i className="action-btn fa-solid fa-shuffle"></i>
                        </button>
                        <button className='btn-action-player' onClick={onPreviosSong}>
                            <i className="action-btn fa-solid fa-backward-step"></i>
                        </button>
                        <button className="player-btn-play-pause" onClick={getActionPlayPausePlayer} >
                            <i className={classPlayPause}></i>
                        </button>
                        <button className='btn-action-player' onClick={onNextSong} >
                            <i className="action-btn fa-solid fa-backward-step btn-next"></i>
                        </button>
                        <button className='btn-action-player' onClick={onRepeat}>
                            <i className={classPlayRepeat}></i>
                        </button>
                    </div>
                    <div className="player-range-container flex">
                        <span>00:00</span>
                        <div className="player-range flex">
                            <input className="player-range-action range" type="range" />
                            {/* <div class="progress-bar" role="progressbar" aria-valuenow="70"
                                aria-valuemin="0" aria-valuemax="100" style="width:70%">
                            </div> */}
                        </div>
                        <span>00:00</span>
                    </div>

                </div>
                <div className="volume-controller flex">
                    <div className="volume-icon"> <i className="fa-solid fa-volume-high"></i></div>

                    <input className="volume-range range"
                        type='range' min={0} max={0.999999} step='any'
                        value={playerState.volume}
                        onChange={handleVolumeChange}
                    />
                </div>
            </div>
        </section>
    )
}

import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"
import ReactPlayer from 'react-player/youtube'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { utilService } from '../services/util.service'
import { getActionPlayPausePlayer, loadPlayer, loadCurrPlayingStation } from '../store/player/player.action'
import { SET_SONG_IDX, SET_REPEAT_SONG, SET_VOLUME } from '../store/player/player.reducer'

export function AppPlayer() {
    const dispatch = useDispatch()

    const player = useSelector(storeState => storeState.playerModule.player)
    const playerState = useSelector(storeState => storeState.playerModule.playerState)
    const station = useSelector(storeState => storeState.playerModule.currPlayingStation)
    const songIdx = useSelector(storeState => storeState.playerModule.currSongIdx)
    const [song, setSong] = useState(null)
    const [songShuffle, setSongShuffle] = useState(null)
    const [playSongRange, setPlaySongRange] = useState(0)
    const [duration, setDuration] = useState(0)
    const timerId = useRef(null)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        loadSong()
    }, [station, songIdx])

    useEffect(() => {
        setDuration(player?.getDuration())
        timerId.current = setInterval(() => {
            if (playerState.playing && player) {
                const time = Math.floor(player.getCurrentTime())
                setProgress(time)
            }
        }, 1000)
    }, [playerState.playing, player])


    function loadSong() {
        if (!station) return
        const songUrl = station.songs.map(song => song.url)[songIdx || 0]
        setSong(songUrl)
    }

    function handleVolumeChange({ target }) {
        let volume = target.value
        dispatch({ type: SET_VOLUME, volume })
    }

    function onShuffleSongs() {
        //אני צריכה להעביר את כל השירים מאוביקט למערך
        console.log('Shuffle isnt perfect yet')
    }

    function onReady(songProp) {
        loadPlayer(songProp)
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

    function onHandleChangePlayRange({ target }) {
        setPlaySongRange(target.value)
        setProgress(target.value)
        console.log('setPlaySongRange', playSongRange)
    }
    function onSeek() {
        console.log('onSeek')
        player.seekTo(playSongRange)
    }
    function onToggleMute() {
        dispatch({ type: SET_REPEAT_SONG })
    }

    function getPBStyle() {
        return player?.getCurrentTime() / player?.getDuration() * 100
    }

    const classPlayPause = (!playerState.playing) ? 'play-pause-btn fa-solid fa-circle-play' : 'play-pause-btn fa-solid  fa-circle-pause'
    const classPlayRepeat = (!playerState.loop) ? 'action-btn fa-solid fa-repeat' : 'action-btn fa-solid fa-repeat btn-action-active'
    const titlePlayPause = (!playerState.playing) ? 'Play' : 'Pause'
    const titleLoop = (!playerState.loop) ? 'Enable repeat' : 'Disble repeat'

    if (!playerState) return
    return (
        <section className="app-playerS">
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
                    <img className="song-img" src={station?.songs[songIdx]?.imgUrl} />
                    <p className="song-title">{station?.songs[songIdx]?.title}</p>
                    <p className="song-artist">{station?.songs[songIdx]?.createdBy}</p>

                </div>
                <div className="player-actions-container grid justify-center">
                    <div className="player-actions flex">
                        <button className='btn-action-player btn-shuffle-songs' onClick={onShuffleSongs} >
                            <i className="action-btn fa-solid fa-shuffle"></i>
                        </button>
                        <button className='btn-action-player' title='Previous' onClick={onPreviosSong}>
                            <i className="action-btn fa-solid fa-backward-step"></i>
                        </button>
                        <button className="player-btn-play-pause" title={titlePlayPause} onClick={getActionPlayPausePlayer} >
                            <i className={classPlayPause}></i>
                        </button>
                        <button className='btn-action-player' title="Next" onClick={onNextSong} >
                            <i className="action-btn fa-solid fa-backward-step btn-next"></i>
                        </button>
                        <button className='btn-action-player' title={titleLoop} onClick={onRepeat}>
                            <i className={classPlayRepeat}></i>
                        </button>
                    </div>
                    <div className="player-range-container flex">
                        <span>{utilService.getTimeFromSeconds(progress)}</span>
                        <div className="player-range flex">
                            <input className="player-range-action range" type="range"
                                min={0} max={duration}
                                value={progress}
                                onChange={onHandleChangePlayRange} onMouseUp={onSeek}
                                style={{ background: `linear-gradient(to right, #b3b3b3 0%, #b3b3b3 ${getPBStyle()}%, #b3b3b340 ${getPBStyle()}%, #b3b3b340 100%)` }} />

                        </div>
                        <span>{utilService.getTimeFromSeconds(Math.floor(duration))} </span>

                    </div>

                </div>
                <div className="volume-controller flex">
                    <button className='toggle-mute' onClick={onToggleMute}>
                        <div className="volume-icon"> <i className="fa-solid fa-volume-high"></i></div>
                    </button>
                    
                    <input className="volume-range range"
                        type='range' min={0} max={0.999999} step='any'
                        value={playerState.volume}
                        onChange={handleVolumeChange}
                        // style={{ background: `linear-gradient(to right, #b3b3b3 0%, #b3b3b3 ${playerState.volume}%, #b3b3b340 ${playerState.volume}%, #b3b3b340 100%)` }} 
                        style={{ background: `linear-gradient(to right, #b3b3b3 0%, #b3b3b3 80%, #b3b3b340 80%, #b3b3b340 100%)` }}
                    />
                </div>
            </div>
        </section>
    )
}

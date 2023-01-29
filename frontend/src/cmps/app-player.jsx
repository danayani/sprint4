import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"
import ReactPlayer from 'react-player/youtube'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { playerService } from '../services/player.service'
import { utilService } from '../services/util.service'
import { getActionPlayPausePlayer, loadCurrPlayingStation } from '../store/player/player.action'
import { SET_SONG_IDX, SET_REPEAT_SONG, SET_VOLUME } from '../store/player/player.reducer'
import { timeout } from 'workbox-core/_private'

export function AppPlayer() {
    const dispatch = useDispatch()

    const playerState = useSelector(storeState => storeState.playerModule.playerState)
    const station = useSelector(storeState => storeState.playerModule.currPlayingStation)
    const songIdx = useSelector(storeState => storeState.playerModule.currSongIdx)

    const [playerCB, setPlayerCB] = useState(null)
    const [song, setSong] = useState(null)
    const [songShuffle, setSongShuffle] = useState(null)
    const [timelineSongTimeoutId, setTimelineSongTimeoutId] = useState()
    const [playSongRange, setPlaySongRange] = useState(0)

    const [songDuration, setSongDuration] = useState({ duration: 0, curr: 0, untilDone: 0 })


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
        dispatch({ type: SET_VOLUME, volume })
    }

    function onShuffleSongs() {
        //אני צריכה להעביר את כל השירים מאוביקט למערך
        console.log('Shuffle isnt perfect yet')
    }

    function onReady(songProp) {
        setPlayerCB(songProp)
        startTimelinsSong(songProp)
        console.log('onReady')

        upDateRange(songProp)
    }

    function upDateRange(songProp){
        // console.log('upDateRange(songProp)',songProp.getCurrentTime())
        
        // setInterval(upDateRange,1000)
        setTimeout(upDateRange,1000)
    }

    function startTimelinsSong(songProp) {
        let dur = songProp.getDuration()
        setSongDuration(prev => ({ ...prev, duration: dur, curr: 0, untilDone: dur }))

        setTimeout(updateSongTimeline, 1000)
        // setTimelineSongTimeoutId(setTimeout(updateSongTimeline, 1000))
    }

    function updateSongTimeline() {
        let newCurr = songDuration.curr + 1

        setSongDuration(prev => ({ ...prev, curr: newCurr }))


        console.log('♥ ♥ ♥ ♥', songDuration.untilDone)
        if (playerState.playing && newCurr < songDuration.duration) {
            console.log('5555555555555555555', songDuration.duration)
        }
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
        console.log('setPlaySongRange', playSongRange)
    }
    function onSeek() {
        console.log('onSeek')
        console.log('player prop', playerCB)
        playerCB.seekTo(playSongRange)
    }
    function onToggleMute(){
        dispatch({ type: SET_REPEAT_SONG })
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
                        <span>{utilService.getTimeFromSeconds(songDuration.curr)}</span>
                        <div className="player-range flex">
                            <input className="player-range-action range" type="range"
                                min={songDuration.curr} max={songDuration.untilDone}
                                // value={playerState.volume}
                                onChange={onHandleChangePlayRange} onMouseUp={onSeek} />

                            {/* <div class="progress-bar" role="progressbar" aria-valuenow="70"
                                aria-valuemin="0" aria-valuemax="100" style="width:70%">
                            </div> */}
                        </div>
                        <span>{utilService.getTimeFromSeconds(songDuration.untilDone)} </span>

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
                    />
                </div>
            </div>
        </section>
    )
}

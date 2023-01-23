import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import ReactPlayer from 'react-player/youtube'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { playerService } from '../services/player.service'
import { utilService } from '../services/util.service'

// import Duration from 'react-player/Duration'
// import { UserMsg } from './user-msg.jsx'

//TODO : control button

export function AppPlayer() {

    const [state, setState] = useState({
        url: ['https://www.youtube.com/watch?v=QtXby3twMmI', 'https://www.youtube.com/watch?v=oUFJJNQGwhk'],
        pip: false,
        playing: true,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        duration: 0,
        loop: false
    })

    const [songs, setSongs] = useState([]) //TODO : get default song
    const [playingS, setPlayingS] = useState(false)
    const playingTimePass = useRef()
    const volumePlayer = useRef(0.8)

    useEffect(() => {
        loadSongs()
    }, [])

    function loadSongs() {
        setSongs(['https://www.youtube.com/watch?v=QtXby3twMmI',
            'https://www.youtube.com/watch?v=oUFJJNQGwhk'])

    }


    function onTagglePlaying() { //taggle playingS
        console.log('play/pause')
        setState({ playing: !state.playing })
    }

    function handleVolumeChange(ev) {
        // ev.preventDefault()
        console.log('volume changed', ev.target.value)
        setState({ volume: +ev.target.value })
    }

    function onShuffleSongs() {
        console.log('shuffleSongs')
        setSongs(utilService.shuffle(songs))
    }

    function onNextSong() {

    }

    function onReady(x) {
        console.log(x)
    }


    const classPlayPause = (!state.playing) ? 'play-pause-btn fa-solid fa-circle-play' : 'play-pause-btn fa-solid  fa-circle-pause'
    if (!songs || !songs.length) return (<h1> loading</h1>)
    else if (songs !== []) return (
        <div className="app-playerS">
            {console.log('songs player', songs)}
            < ReactPlayer className="player-video"
                url={songs}
                pip={state.pip}
                playing={state.playing}
                controls={state.controls}
                volume={state.volume}
                muted={state.muted}
                duration={state.duration}
                loop={state.loop}
                onReady={onReady}
            />
            <div className="app-playerS flex">
                <div className="song-details flex">
                    <img className="song-img" src='../assets/img/rh.jpg' />
                    {/* <p className="song-title">{songs[0].title}</p> */}
                </div>

                <div className="player-actions-container grid justify-center">
                    <div className="player-actions flex">
                        <button className='btn-shuffle-songs' onClick={onShuffleSongs} >
                            <i className="action-btn fa-solid fa-shuffle"></i>
                        </button>
                        <i className="action-btn fa-solid fa-backward-step"></i>
                        <button className="player-btn-play-pause" onClick={onTagglePlaying}>
                            <i className={classPlayPause}></i>
                        </button>
                        <i className="action-btn fa-solid fa-backward-step btn-next"></i>
                        <i className="action-btn fa-solid fa-repeat"></i>
                    </div>
                    <div className="player-range-container">
                        <div className="player-range flex">
                            <input className="player-range-action" type="range" />
                        </div>
                    </div>

                </div>
                <div className="volume-controller flex">
                    <div className="volume-icon"> <i className="fa-solid fa-volume-high"></i></div>

                    <input className="volume-range"
                        type='range' min={0} max={0.999999} step='any'
                        value={state.volume}
                        onChange={handleVolumeChange}
                    />

                </div>
            </div>
        </div>
    )
}

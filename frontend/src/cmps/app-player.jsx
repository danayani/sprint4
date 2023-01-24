import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import ReactPlayer from 'react-player/youtube'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { playerService } from '../services/player.service'
import { utilService } from '../services/util.service'

//load store 22:25
//load actions 27:19
//כל פעם שאני רוצה לעשות פעולה אסינכרונית

// import Duration from 'react-player/Duration'
// import { UserMsg } from './user-msg.jsx'

export function AppPlayer() {
    const playerState = useSelector(storeState => storeState.playerModule.playerState)

    const [songs, setSongs] = useState([]) //TODO : useSelector, show only when i have a song 

    useEffect(() => {
        loadSongs()
    }, [])

    function loadSongs() {
        setSongs(['https://www.youtube.com/watch?v=QtXby3twMmI',
            'https://www.youtube.com/watch?v=oUFJJNQGwhk'])

    }


    function onTagglePlaying() { //taggle playingS
        console.log('play/pause')
        // setState({ playing: !state.playing })
    }

    function handleVolumeChange(ev) {
        // ev.preventDefault()
        console.log('volume changed', ev.target.value)
        // setState({ volume: +ev.target.value })
    }

    function onShuffleSongs() {
        console.log('shuffleSongs')
        // setSongs(utilService.shuffle(songs))
    }

    function onReady(x) {
        console.log(x)
    }



    const classPlayPause = (!playerState.playing) ? 'play-pause-btn fa-solid fa-circle-play' : 'play-pause-btn fa-solid  fa-circle-pause'
    if (!songs || !songs.length || !playerState) return (<h1> loading</h1>)
    return (
        <div className="app-playerS">

            {console.log('playerState =>', playerState)}
            {console.log('songs player', songs)}

            < ReactPlayer className="player-video"
                url={songs}
                pip={playerState.pip}
                playing={playerState.playing}
                controls={playerState.controls}
                volume={playerState.volume}
                muted={playerState.muted}
                duration={playerState.duration}
                loop={playerState.loop}
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
                            <input className="player-range-action range" type="range" />
                            {/* <div class="progress-bar" role="progressbar" aria-valuenow="70"
                                aria-valuemin="0" aria-valuemax="100" style="width:70%">
                            </div> */}
                        </div>
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
        </div>
    )
}

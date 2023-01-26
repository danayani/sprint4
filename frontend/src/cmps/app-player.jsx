import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import ReactPlayer from 'react-player/youtube'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { playerService } from '../services/player.service'
import { utilService } from '../services/util.service'
import { getActionPlayPausePlayer } from '../store/player/player.action'
import { func } from 'prop-types'


export function AppPlayer() {

    const playerState = useSelector(storeState => storeState.playerModule.playerState)
    const station = useSelector(storeState => storeState.playerModule.currPlayingStation)
    const songIdx = useSelector(storeState => storeState.playerModule.currSongIdx)

    const [song, setSong] = useState(null)
    const [songDuration, setSongDuration] = useState({ duration: 0, curr: 0, untilDone: 0 })

    useEffect(() => {
        loadSong()
    }, [station, songIdx])

    function loadSong() {
        if (!station) return
        const songUrl = station.songs.map(song => song.url)[songIdx || 0]
        setSong(songUrl)
    }

    function handleVolumeChange(ev) {
        console.log('volume changed', ev.target.value)
    }

    function onShuffleSongs() {
        console.log('shuffleSongs')
    }

    function onReady(songProp) {
        console.log('onReady', songProp)
        loadSongDuration(songProp)
        // const text = x.getDuration()
        // console.log('getDuration()',songProp )
        console.log(songDuration)
        // console.log('seekTo()', x.seekTo(230)) //go to were you want, in sec

    }

    function loadSongDuration(songProp) {
        let durSong = songProp.getDuration()
        console.log('loadSongDuration', durSong)
        setSongDuration({
            duration: durSong, curr: 0, untilDone: 0
        })
        console.log('songDuration', songDuration)
    }

    function onPreviosSong(){
        if(!station) return
        
        if(songIdx === 0){
            songIdx = 0 //need to start play from 1sec
        }
        else {
            console.log('station.songs', station.songs)
        }

    }

    const classPlayPause = (!playerState.playing) ? 'play-pause-btn fa-solid fa-circle-play' : 'play-pause-btn fa-solid  fa-circle-pause'
    if (!playerState) return  //TODO: only hidden song details
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
                    <img className="song-img" src={station?.songs[songIdx].imgUrl} />
                    <p className="song-title">{station?.songs[songIdx].title}</p>
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
                        <button className='btn-action-player' >
                            <i className="action-btn fa-solid fa-backward-step btn-next"></i>
                        </button>
                        <button className='btn-action-player' >
                            <i className="action-btn fa-solid fa-repeat"></i>
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

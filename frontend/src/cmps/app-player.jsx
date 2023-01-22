import { useState , useEffect} from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import ReactPlayer from 'react-player/youtube'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { playerService } from '../services/player.service'
// import { UserMsg } from './user-msg.jsx'





//TODO : control button

export function AppPlayer() {

    const[songs, setSongs] = useState([]) //TODO : get default song

    useEffect(() => {
        setSongs(playerService.getSongs())
        
    }, [])

    if(!songs) return 
    else return (
        <div className="app-playerS flex">
            {console.log('songs in player',songs )}
            <ReactPlayer className="player-video" url='https://www.youtube.com/watch?v=oUFJJNQGwhk'
                loop={true}
                width='100px'
                height='100px' />

            <div className="song-details flex">
                {/* <iframe className='video-player' id="player" type="text/html" width="100" height="70"
                src={`http://www.youtube.com/embed/QtXby3twMmI`}
                frameBorder="0"></iframe> */}


                <img className="song-img" src='../assets/img/rh.jpg' />
                <p className="song-title">song title</p>
            </div>

            <div className="player-actions-container grid justify-center">
                <div className="player-actions flex">
                    <i className="action-btn fa-solid fa-shuffle"></i>
                    <i className="action-btn fa-solid fa-backward-step"></i>
                    <button className="player-btn-play-pause">
                        <i className="action-btn1 play-pause-btn fa-solid fa-circle-play"></i>
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
                <input className="volume-range" type="range" />
            </div>



        </div>
    )
}

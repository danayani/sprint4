// Music player

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import ReactPlayer from 'react-player/youtube'
import ProgressBar from 'react-bootstrap/ProgressBar'


//icons
import volumeIcon from '../assets/icons/player/speaker/volume-high-solid.svg'

// import { UserMsg } from './user-msg.jsx'

//TODO : get (props) song-item
//TODO : control button

export function AppPlayer() {
    return (

        <div className="app-playerS flex">
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
                    <i className="fa-solid fa-shuffle"></i>
                    <i className="fa-solid fa-backward-step"></i>
                    <button className="player-btn-play-pause">
                        <i className="fa-solid fa-circle-play"></i>
                    </button>
                    <i className="fa-solid fa-backward-step btn-next"></i>
                    <i className="fa-solid fa-repeat"></i>
                </div>
                <div className="player-range-container">
                   <div className="player-range flex">
                    <input type="range" />
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

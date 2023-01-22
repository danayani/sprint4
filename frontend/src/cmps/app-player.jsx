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
                <p className="song-name">song name</p>
                <p className="song-artist">song artist</p>
            </div>

            <div className="actions flex justify-center">
                <div>
                    <i class="fa-solid fa-shuffle"></i>
                </div>
                <div>
                    <input type="range" />
                </div>
            </div>

            <div className="volume-controller flex">
                <i class="fa-solid fa-volume-high"></i>
                <input type="range" />
            </div>



        </div>
    )
}

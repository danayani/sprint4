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
                width='300px'
                height='300px'

            />
            <progress max="1" value="1"></progress>
            <div className="song-details flex">
                <h1><i class="fa-brands fa-github-square">12</i></h1>

                {/* <iframe className='video-player' id="player" type="text/html" width="100" height="70"
                src={`http://www.youtube.com/embed/QtXby3twMmI`}
                frameBorder="0"></iframe> */}


                <img className="song-img" src='../assets/img/rh.jpg' />
                <p className="song-name">song name</p>
                <p className="song-artist">song artist</p>


                <div className="actions flex justify-center">
                    on/off
                    <input type="range" />
                </div>

                <div className="volume-controller flex">
                    volume
                    <input type="range" />
                </div>


            </div>
        </div>
    )
}

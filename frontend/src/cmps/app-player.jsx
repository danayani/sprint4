// Music player

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'


//icons
import volumeIcon from '../assets/icons/player/speaker/volume-high-solid.svg'

// import { UserMsg } from './user-msg.jsx'

//TODO : get (props) song-item
//TODO : control button

export function AppPlayer() {
    return (
        <div className="app-playerS flex">
            <iframe className='video-player' id="player" type="text/html" width="100" height="70"
                src={`http://www.youtube.com/embed/QtXby3twMmI`}
                frameBorder="0"></iframe>

            <div className="song-details flex">
                <img className="song-img" src='../assets/img/rh.jpg' />
                <p className="song-name">song name</p>
                <p className="song-artist">song artist</p>
            </div>

            <div className="actions flex justify-center">
                on/off
                <a href="#" class="fa facebook"></a>
            </div>

            <div className="volume-controller flex">
                volume
                <img className='volume icon-player' src={volumeIcon} />
            </div>


        </div>
    )
}
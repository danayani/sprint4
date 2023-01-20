// Music player

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

// import { UserMsg } from './user-msg.jsx'


export function AppPlayer() {
    return (
        <div className="app-playerS">
            <h2>player</h2>
            {/* key={item.id} */}
            <iframe className='video-player' id="player" type="text/html" width="100" height="70"
                    src={`http://www.youtube.com/embed/QtXby3twMmI`}
                    frameBorder="0"></iframe>

        </div>
    )
}
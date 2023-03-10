import { useLocation } from 'react-router-dom'

import liked from '../assets/img/liked-song-img.png'
export function StationHeader({ station, playStation, deleteStation, updateStation, saveChanges }) {
    const location = useLocation()
    function onPlay(ev) {
        ev.stopPropagation()
        playStation()
    }

    async function toggleLike() {
        console.log('toggled the like button')
    }

    function onDeleteStation(ev) {
        ev.stopPropagation()
        deleteStation(station._id)
    }

    return (
        <section className="station-header">
            <div className="top-container">
                {location.pathname.includes('/liked-songs') ? (<div className="img-container"><img src={liked} alt="station image" /></div>)
                    :
                    (station.songs?.length > 0 || station.imgUrl ?
                        <div className="img-container">
                            <img src={station.imgUrl} alt="station image" />
                        </div>
                        :
                        <div className="img-container" >
                            <img src="../assets/img/create.jpg" alt="station image" />
                        </div>
                    )
                }
                <div className="info-container">
                    <h2 className="title">PLAYLIST</h2>
                    <h1>{station.name}</h1>
                    <p className="station-description">
                        <span>{station?.createdBy.fullname} ◽ </span>
                        {station.songs?.length} songs
                        <span> 7 min 58 sec </span>
                    </p>
                </div>
            </div>
            <div className="details-controls">
                <button className="btn-play" title="Play" onClick={(ev) => onPlay(ev)}>
                    <svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" className="Svg-sc-ytk21e-0 uPxdw"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
                        <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                </button>
                <button className="btn-like" onClick={toggleLike}>
                    <svg role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" className="Svg-sc-ytk21e-0 uPxdw"><path d="M8.667 1.912a6.257 6.257 0 00-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 003.09 0l7.956-9.482a6.188 6.188 0 001.382-5.234l-.49.097.49-.099a6.303 6.303 0 00-5.162-4.98h-.002a6.24 6.24 0 00-5.295 1.65.623.623 0 01-.848 0 6.257 6.257 0 00-2.91-1.568z"></path>
                        <path d="M8.667 1.912a6.257 6.257 0 00-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 003.09 0l7.956-9.482a6.188 6.188 0 001.382-5.234l-.49.097.49-.099a6.303 6.303 0 00-5.162-4.98h-.002a6.24 6.24 0 00-5.295 1.65.623.623 0 01-.848 0 6.257 6.257 0 00-2.91-1.568z"></path></svg>
                </button>
                <button className="btn-options">
                    <svg role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" className="Svg-sc-ytk21e-0 uPxdw"><path d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                        <path d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                </button>
                <button className="btn-delete-station" onClick={onDeleteStation}>X</button>
            </div>
        </section>
    )
}
//render the songs inside the station

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { loadStationById } from "../store/station/station.actions.js"



export function StationDetails({ station }) {
    console.log('station from STATION-DETAILS :>> ', station);

    const stationDuration = station.songs.reduce((totalDuration, idx, songDuration) => {
        songDuration = station.songs[idx].duration
        return totalDuration + songDuration
    })
    // add loader 
    return (
        <section className="station-details">
            <div className="img-container">
                <img src={station.songs[0].imgUrl} alt="play list image" />
            </div>
            <div className="info-container">
                <p className="title">PLAYLIST</p>
                <h1>{station.name}</h1>
                <p>
                    {station.createdBy.fullname} ◽ 
                    {station.songs.length} <span>songs,</span>

                </p>
            </div>

        </section>

    )
}
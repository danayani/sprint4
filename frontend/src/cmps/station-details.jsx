import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { stationService } from "../services/station.service.js"
// import { loadStationById } from "../store/station/station.actions.js"



export function StationDetails() {
    const { stationId } = useParams()
    const [station, setStation] = useState(null)

    useEffect(() => {
        stationService.getById(stationId).then(station => {
            setStation(station)
        })
    }, [stationId])

    if (!station) return <h1> loading...</h1>
    return (
        <section className="station-details">
            <div className="top-container">
                <div className="img-container">
                    <img src={station.songs[0].imgUrl} alt="play list image" />
                </div>
                <div className="info-container">
                    <h2 className="title">PLAYLIST</h2>
                    <h1>{station.name}</h1>
                    <p className="station-description">
                        <span>{station.createdBy.fullname} ◽ </span>
                        <span>24 min 25 sec </span>
                    </p>
                </div>
            </div>
            <span className="stations-controls">
                play | like | options
            </span>

        </section>

    )
}
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { stationService } from "../services/station.service.js"
import { loadStationById } from "../store/station/station.actions.js"



export function StationDetails() {
    const { stationId } = useParams()
    const [station, setStation] = useState([])

    useEffect(() => {
        stationService.getById(stationId).then(res => {
            console.log('res ', res)
            setStation(res)

        })
    }, [])

    return (
        <section className="station-details">
            <div className="img-container">
                img
                {/* <img src={station.songs[0].imgUrl} alt="play list image" /> */}
            </div>
            <div className="info-container">
                <p className="title">PLAYLIST</p>
                {/* <h1>{station.name}</h1> */}
                <p>
                    {/* <span>{station.createdBy.fullname} ◽ </span>
                    {station.songs.length} <span>songs, </span> */}
                    <span>24 min 25 sec </span>
                </p>
            </div>
            <span className="options">
                play | like | options
            </span>

        </section>

    )
}
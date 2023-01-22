//render the songs inside the station

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { loadStationById } from "../store/station/station.actions.js"



export function StationDetails() {

    // const station = useSelector(storeState => storeState.stationModule.currStation)
    const { stationId } = useParams()

    // useEffect(() => {
    //     loadStationById(stationId)
    // }, [])

    // add loader 
    return (
        <div className="station-details-container">
            <h1>StationDetails : {stationId}</h1>
        </div>
    )
}
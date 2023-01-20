//render the songs inside the station

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { loadStationById } from "../store/station.actions.js"
import { StationPreview } from "./station.preview.jsx"



export function StationDetails() {

    const station = useSelector(storeState => storeState.stationModule.currStation)
    const { stationId } = useParams()

    useEffect(() => {
        loadStationById(stationId)
    }, [])

    // add loader 
    return (
        <ul className='songs-list'>
            {console.log('hello from song list', station)}
            
            {station.songs.map(song => {
                // TODO: should we give each li a unique id?
                <li className='song-preview' key={song.id}>
                    <StationPreview songs={station.songs} />

                </li>
            })
            }
        </ul>

    )
}
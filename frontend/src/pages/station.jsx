import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"

import { SongList } from '../cmps/song-list'
import { StationDetails } from '../cmps/station-details'
import { stationService } from '../services/station.service'
import { updateStation, removeStation } from "../store/station/station.actions"



export function Station({ saveStation }) {

    const [station, setStation] = useState(null)
    const { stationId } = useParams()
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!stationId) setStation(stationService.getEmptyStation())
    //     else loadStation()
    // }, [stationId])

    // async function loadStation() {
    //     const currStation = await stationService.getById(stationId)
    //     setStation(currStation)
    // }

    function onSaveStation() {
        saveStation(station)
    }

    async function onRemoveStation(stationId) {
        await removeStation(station)
        navigate('/')
    }



    return (
        <section className="station">
            <StationDetails />
            <SongList />







            <div className='footer-spacer'>
                <h2 className='footer-filler'></h2>
                <hr/>
                <h2 className='footer-filler'></h2>
            </div>
        </section>
    )
}
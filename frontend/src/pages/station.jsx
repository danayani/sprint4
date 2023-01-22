import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SongList } from '../cmps/song-list'
import {stationService} from '../services/station.service'
import { removeStation } from "../store/station/station.actions"

export function Station({saveStation}){
    const [station,setStation] = useState([])
    const {stationId} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!stationId) setStation(stationService.getEmptyStation())
        else loadStation()
    },[stationId])

    async function loadStation(){
        const currStation = await stationService.getById(stationId)
        setStation(currStation)

    }

    function onSaveStation(){
        saveStation(station)
    }

    async function onRemoveStation(stationId){
        await removeStation(station)
        navigate('/')
    }



    return (
        <section className="station">
            <StationDetails />
            <SongList />
            {/* <StationList station={station} /> */}
        </section>
    )
}
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { stationService } from "../services/station.service"

//TODO : service function 'getSongListByStationId'
export function SongList() {

    const { stationId } = useParams()
    const [station, setStation] = useState([])

    useEffect(() => {
        stationService.getById(stationId).then(res => {
            const songsList = res.songs
            setStation(songsList)

        })
    }, [])
    console.log('station ', stationId, ' : ', station)


    

    return (
        <div>
            <h2>song list for station : {stationId} </h2>
            <ul className="song-list">
                {/* <p> {station} </p> */}
                {console.log('station song', )}
            </ul>
        </div>
    )
}
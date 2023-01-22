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

        // <h2>song list for station : {stationId} </h2>
        <tbody className="song-list">
            <tr>
                <th>#</th>
                <th className="song-list-title">TITLE</th>
                <th>DATE ADDED</th>
                <th><i className="fa-regular fa-clock"></i></th>
            </tr>
            {/* {mails.map(mail => <li className="mail-item" key={mail.id}>
                <MailPreview onRemoveMail={onRemoveMail} mail={mail} />
            </li>)} */}

            {console.log('station', station)}
            {station.map(station => { 
                return<tr>
                    <td></td>
                    <td><button className="btn-song-title-play">{station.title}</button></td>
                    <td>{station.addedAt}</td>
                    <td>03:15</td>
                </tr>
            })
            }
            <tr>
                <td>1</td>
                <td>coldplay - bla bla bla</td>
                <td> 14.3.1997</td>
                <td> 03:15</td>
            </tr>
            <tr>
                <td>1</td>
                <td>coldplay - bla bla bla</td>
                <td> 14.3.1997</td>
                <td> 03:15</td>
            </tr>
            <tr>
                <td>1</td>
                <td>coldplay - bla bla bla</td>
                <td> 14.3.1997</td>
                <td> 03:15</td>
            </tr>
        </tbody>


    )
}
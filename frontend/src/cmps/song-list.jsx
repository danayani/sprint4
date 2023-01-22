import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { stationService } from "../services/station.service"


//TODO : service function 'getSongListByStationId'
export function SongList() {

    const { stationId } = useParams()
    const [stationSongs, setStationSongs] = useState([])

    useEffect(() => {
        stationService.getById(stationId).then(res => {
            const songsList = res.songs
            setStationSongs(songsList)

        })
    }, [])
    console.log('station ', stationId, ' : ', stationSongs)


    return (

        // <h2>song list for station : {stationId} </h2>
        <tbody className="song-list-tbody">
            <tr>
                <th className="song-list-tbodyHashtag" >#</th>
                <th className="song-list-title">TITLE</th>
                <th>DATE ADDED</th>
                <th><i className="song-list-tbodyTime fa-regular fa-clock"></i></th>
            </tr>
            {/* {mails.map(mail => <li className="mail-item" key={mail.id}>
                <MailPreview onRemoveMail={onRemoveMail} mail={mail} />
            </li>)} */}

            {console.log('station', stationSongs)}
            {stationSongs.map(station => { 
                return<tr key={station.id}>
                    <td></td>
                    <td><button className="btn-song-title-play">{station.title}</button></td>
                    <td>{station.addedAt}</td>
                    <td>03:15</td>
                </tr>
            })
            }
            {/* <tr>
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
            </tr> */}
        </tbody>


    )
}
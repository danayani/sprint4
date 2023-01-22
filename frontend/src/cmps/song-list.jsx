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

    function onPlay(songId){

    }

    if (!stationSongs) return (<h1> loading...</h1>)
    else return (
        <div className="song-list-container" >
            <header className="header-song-list grid">
                <span>#</span>
                <span>TITLE</span>
                <span>DATE ADDED</span>
                <span><i className="song-list-tbodyTime fa-regular fa-clock"></i></span>
            </header>
            <ul>
                {console.log('stationSongs', stationSongs)}
                {/* <h1>{stationSongs[0].createdBy}</h1> */}
                {stationSongs.map(song => {
                    <article role="button">
                        <li className="song-list-li grid">
                            <div className="btn-song-list-play">
                                1
                            </div>
                            <section>
                                <div className="song-list-img">
                                    img
                                </div>
                                <section>
                                    <p>song name</p>
                                </section>
                            </section>
                            <div className="song-list-artist">
                                artist
                            </div>
                            <div className="song-list-add-date">
                                add-date
                            </div>
                            <div className="song-list-duration">
                                00:00
                            </div>
                        </li>
                    </article>
                })
                }
            </ul>
        </div>

        // <h2>song list for station : {stationId} </h2>
        // <tbody className="song-list-tbody">
        //     <tr>
        //         <th className="song-list-tbodyHashtag" >#</th>
        //         <th className="song-list-title">TITLE</th>
        //         <th>DATE ADDED</th>
        //         <th><i className="song-list-tbodyTime fa-regular fa-clock"></i></th>
        //     </tr>
        //     {/* {mails.map(mail => <li className="mail-item" key={mail.id}>
        //         <MailPreview onRemoveMail={onRemoveMail} mail={mail} />
        //     </li>)} */}

        //     {console.log('station', stationSongs)}
        //     {stationSongs.map(station => {
        //         return <tr key={station.id}>
        //             <td></td>
        //             <td><button className="btn-song-title-play">{station.title}</button></td>
        //             <td>{station.addedAt}</td>
        //             <td>03:15</td>
        //         </tr>
        //     })
        //     }

        // </tbody>


    )
}
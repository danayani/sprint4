import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { stationService } from "../services/station.service"
import { SHOW_MSG } from "../services/event-bus.service";


//TODO : service function 'getSongListByStationId'
export function SongList() {

    const { stationId } = useParams()
    const [stationSongs, setStationSongs] = useState([])

    useEffect(() => {
        loadSongs()
    }, [])

    function loadSongs() {
        stationService.getById(stationId).then(res => {
            const songsList = res.songs
            setStationSongs(songsList)
        })
            .catch((err) => {
                console.log('Had issues in song list', err)
            })

    }

    function onPlay(songId) {

    }

    if (!stationSongs || !stationSongs.length) return <h1> loading...</h1>
    return (<div className="song-list-container" >
        <header className="header-song-list grid">
            <span>#</span>
            <span>TITLE</span>
            <span>DATE ADDED</span>
            <span><i className="song-list-tbodyTime fa-regular fa-clock"></i></span>
        </header>
        <ul>
            {console.log('stationSongs', stationSongs)}
            {stationSongs.map(song => {
                { console.log('song', song) }
                return <article role="button">
                    <li className="song-list-li grid">
                        <div className="btn-song-list-play">
                            1
                        </div>
                        <section>
                            <div >
                                <img className="song-list-img" src={song.imgUrl} />

                            </div>
                            <section>
                                <p>{song.title}</p>

                            </section>
                        </section>
                        <div className="song-list-artist">
                            {song.createdBy}
                        </div>
                        <div className="song-list-add-date">
                            {song.addedAt}
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
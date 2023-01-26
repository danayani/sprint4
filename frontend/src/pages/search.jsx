// import { youtubeService } from "../services/youtube.service";
import { NavLink } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"

import { stationService } from "../services/station.service.js"
import { youtubeService } from "../services/youtube.service.js"
// import { utilService } from "../services/util.service";


export function Search() {
    // const params = useParams()
    const [songsFromSearch, setSongsFromSearch] = useState(null)
    const geners = stationService.getMusicGeners()
    
    const location = useLocation()
    console.log('location',location)
    console.log('locationkey',location.key)

    // const song = location.search
    const song = "a"
    console.log('song',song)
    
    let songKey = song.slice(11)
    console.log('songKey',songKey)

    useEffect(() => {
        getSongsFromSearch()
        // setSongsFromSearch(newSongsFromSearch)
    }, [])

    async function getSongsFromSearch(){
        console.log('song', song)
        console.log('songsFromSearch :>> ', songsFromSearch)
        if ((song) && (!songsFromSearch)) {
        console.log('Getting songs from youtube')
        youtubeService.getServerSideSearch(songKey)
        .then(res=>{
            let songs = res.items
            setSongsFromSearch(songs)
            console.log('songs from search',songs)
        })
        .catch((err)=>{
            console.log('cannot find that particular song', err)
            throw err
        })
    }}

    console.log('songsFromSearch :>> ', songsFromSearch)

    
    function onFilterCardClicked(filterByGener) {}

    return (
        <main className="main-search-container">
           
           {songsFromSearch && 
            <div className="search-results-songs-list">
                    {songsFromSearch.map((song) => {
                        return (
                            <article role="button" key={song.eatg}>
                                <li key={song.id.videoId} className="song-list-li grid">
                                    <img className="song-list-img" src={song.snippet.thumbnails.default.url} alt="Magnifing glass" />
                                    <p className="song-list-title">{song.title}</p>
                                    <p className="song-list-artist">{song.snippet.channelTitle}</p>
                                    <p className="song-list-description"> {song.snippet.title}</p>
                                    <button className="add-song-btn" onClick={() => console.log( song, 'song :>> was clicked',)}>Add</button>
                                </li>
                            </article>
                        )
                    }
                    )}
            </div>}
           
           <h2>Browse all</h2>

            <section className="filter-cards-container">
                {geners.map((gener, idx) =>
                    <NavLink to={`/${gener.name}`} key={idx} >
                        <div className="filter-card" onClick={onFilterCardClicked(gener)} style={{ backgroundColor: gener.bgc }}>
                            <h2>{gener.name}</h2>
                            <img className="filter-img" src={gener.imgUrl} alt="filter img" />
                            {/* <button className='play'>Play</button> */}
                        </div>
                    </NavLink>

                )}
            </section>
            

        </main>
    )
}
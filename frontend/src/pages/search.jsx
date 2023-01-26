import { NavLink } from "react-bootstrap"
import { useEffect, useState, useRef } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"

import { Loader } from "../cmps/loader.jsx"
import { stationService } from "../services/station.service.js"
import { youtubeService } from "../services/youtube.service.js"

export function Search() {
    // for later use    
    const recentSearches = useRef('')

    const [songsFromSearch, setSongsFromSearch] = useState(null)
    const location = useLocation()
    const geners = stationService.getMusicGeners()
    
    const songKey = location.search.slice(11)
    // console.log('songKey', songKey)

    useEffect(() => {
        // console.log('useEffect activated')
        getSongsFromSearch()
        recentSearches.current = recentSearches.current + songKey
        //for later use
    }, [songKey])

    async function getSongsFromSearch() {
        // console.log('getSongsFromSearch entered with', songsFromSearch)
        if ((songKey) && (!songsFromSearch)) {
            // console.log('Getting songs from youtube')

            youtubeService.getServerSideSearch(songKey)
            .then(songs => {
                    // console.log('songs from youtube search', songs)
                    setSongsFromSearch(songs)
                })
                .catch((err) => {
                    // console.log('cannot find that particular song', err)
                    throw err
                })
        }
    }

    // console.log('songsFromSearch :>> ', songsFromSearch)
    // console.log('recentSearchs', recentSearches)
    
    function onFilterCardClicked(filterByGener) { 
        // console.log('A filter was clicked', filterByGener)
    }

    if (!geners) <Loader />
    return (
        <main className="main-search-container">

            {/* SONGS FROM SEARCH */}
            {songsFromSearch &&
                <div className="search-results-songs-list">
                    <h2>Songs</h2>
                    {songsFromSearch.map((song) => {
                        return (
                            <article role="button" key={song.id} >
                                <li key={song.id} className="song-list-li grid">
                                    <img className="song-list-img" src={song.imgUrl} alt="Magnifing glass" />
                                    <p className="song-list-title">{song.title}</p>
                                    <p className="song-list-artist">{song.createdBy}</p>
                                </li>
                            </article>
                        )
                    }
                    )}
                </div>
            }

            {/* RECENT SEARCHES */}
            {recentSearches.current &&
                <section className="recent-searches-container">
                    <h2>Popular Searchs</h2>
                    <section className="filter-cards-preview">
                        {/* after every search save the first result: */}
                        {/* - searchWord */}
                        {/* - imgUrl */}
                        {/* add button that starts youtube search */}
                        {/* onClick={() => getSongsFromSearch()} */}
                        {/* render as a card just like thr filter cards */}
                    </section>
                </section>
            }

            {/* FILTER CARDS */}
            <section className="filter-cards-container">
                <h2>Browse all</h2>
                <section className="filter-cards-preview">
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
            </section>

        </main>
    )
}
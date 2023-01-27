// import { NavLink } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { Loader } from "../cmps/loader.jsx"
import { stationService } from "../services/station.service.js"
import { youtubeService } from "../services/youtube.service.js"
import { utilService } from "../services/util.service.js"



export function Search() {
    // for later use    
    // const recentSearches = useRef('')

    const [songsFromSearch, setSongsFromSearch] = useState(null)
    const location = useLocation()
    const geners = stationService.getMusicGeners()

    const songKey = location.search.slice(11)
    console.log('songKey from location', songKey)

    useEffect(() => {
        console.log('useEffect activated')
        getSongsFromSearch()

        //for later use
        // recentSearches.current = recentSearches.current + songKey
    }, [songKey])

    async function getSongsFromSearch() {
        if ((songKey) && (!songsFromSearch)) {
            let searchData = utilService.loadFromStorage(songKey)
            if (!searchData || !searchData.length) {
                youtubeService.getServerSideSearch(songKey)
                    .then(songs => {
                        console.log('songs from youtube search', songs)
                        // Should we save an object with all the songs results, or many different keys?
                        utilService.saveToStorage(songKey, songs)
                        setSongsFromSearch(songs)
                    })
                    .catch((err) => {
                        console.log('cannot find that particular song', err)
                        // is there any reason to throw err?
                        throw err
                    })
            }
            console.log('Loading songs from localStorage')
            setSongsFromSearch(searchData)
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
                <section className="search-results-songs-container">
                    <h2>Songs</h2>
                    <header className="search-results-header">
                        <span>#</span>
                        <span>TITLE</span>
                        <span>ALBUM</span>
                        <span></span>
                        <span><i className="song-list-tbodyTime fa-regular fa-clock"></i></span>
                    </header>
                    <ul>
                        {songsFromSearch.map((song, idx) => {
                            return (
                                <article role="button" key={song.id} >
                                    <li key={song.id} className="song-list-li grid">
                                        <img className="song-list-img" src={song.imgUrl} alt="Magnifing glass" />
                                        <p className="song-list-title">{song.title}</p>
                                        <p className="song-list-artist">{song.createdBy}</p>
                                        <div>like button</div>
                                        <div>song duration</div>
                                    </li>
                                </article>
                            )
                        }
                        )}
                    </ul>
                </section>
            }

            {/* RECENT SEARCHES - for later use*/}
            {/* {recentSearches.current && */}
            {/* <section className="recent-searches-container"> */}
            {/* <h2>Popular Searchs</h2> */}
            {/* <section className="filter-cards-preview"> */}
            {/* after every search save the first result: */}
            {/* - searchWord */}
            {/* - imgUrl */}
            {/* add button that starts youtube search */}
            {/* onClick={() => getSongsFromSearch()} */}
            {/* render as a card just like thr filter cards */}
            {/* </section> */}
            {/* </section> */}
            {/* } */}

            {/* FILTER CARDS */}
            {/* TODO: */}
            <section className="filter-cards-container">
                <h2>Browse all</h2>
                <section className="filter-cards-preview">
                    {geners.map((gener, idx) =>
                        // <NavLink to={`/${gener.name}`} key={idx} >
                        <div className="filter-card" onClick={onFilterCardClicked(gener)} style={{ backgroundColor: gener.bgc }}>
                            <div className="card-title">{gener.name}</div>
                            <img className="filter-img" src={gener.imgUrl} alt="filter img" />
                            {/* <button className='play'>Play</button> */}
                        </div>
                        // </NavLink>

                    )}
                </section>
            </section>

        </main>
    )
}
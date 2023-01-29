import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"

import { stationService } from "../services/station.service.js"
import { actionToggleSongToLikedSong } from "../store/station/station.actions.js"
import { youtubeService } from "../services/youtube.service.js"
import { utilService } from "../services/util.service.js"
import { SET_SONG_IDX} from "../store/player/player.reducer.js"
import { Loader } from "../cmps/loader.jsx"

export function Search({ playStation }) {

    const dispatch = useDispatch()
    const location = useLocation()
    const [songsFromSearch, setSongsFromSearch] = useState(null)
    const geners = stationService.getMusicGeners()

    const songKey = location.search.slice(11)
    console.log('songKey from location', songKey)

    useEffect(() => {
        getSongsFromSearch()
    }, [songKey])

    async function getSongsFromSearch() {
        if ((songKey) && (!songsFromSearch)) {
            let searchData = utilService.loadFromStorage(songKey)
            if (!searchData || !searchData.length) {
                youtubeService.getServerSideSearch(songKey)
                .then(songs => {
                        utilService.saveToStorage(songKey, songs)
                        setSongsFromSearch(songs)
                })
                .catch((err) => {
                        console.error('cannot find that particular song', err)
                        throw err
                })
            }
            setSongsFromSearch(searchData)
        }
    }

    function onPlaySong(songIdx) {
        playStation()
        dispatch({ type: SET_SONG_IDX, songIdx })
    }

    async function toggleLikedSong(song) {
        const update = await actionToggleSongToLikedSong(song)
        setSongsFromSearch(prev => [...prev])
    }

    if (!geners) <Loader />
    return (
        <main className="main-search-container">
            {songsFromSearch &&
                <section className="search-results-songs-container">
                    <h2>Songs</h2>
                    <header className="search-results-header">
                        <div className="number-sign">#</div>
                        <div className="song-title">TITLE</div>
                        <div className="song-album"></div>
                        <div className="song-duration">
                            <i className="fa-regular fa-clock"></i>
                        </div>
                    </header>
                    <div className="search-results-song-list">
                        {songsFromSearch.map((song, idx) => {
                            const classSvgLiked = (song.liked) ? 'song-liked-svg' : 'song-dis-liked-svg'
                            const titleSvgLiked = (!song.liked) ? 'Add to Liked Songs' : 'Remove from Liked Songs'
                            return (
                                <div key={song.id} className="song-list-line" onClick={() => onPlaySong(idx)} >
                                    <div className="song-index">
                                        {idx + 1}
                                    </div>
                                        <img className="searched-song-img" src={song.imgUrl} alt="Magnifing glass" />
                                        <div className="searched-song-title">
                                            {song.createdBy}
                                        </div>
                                        
                                    <div className="searched-song-options">
                                        <div className="song-list-duration">
                                           0{song.duration.min} : {song.duration.sec}
                                        </div>
                                        <button className="add-like-to-song song-action " title={titleSvgLiked} onClick={() => toggleLikedSong(song)} >
                                            <svg id="song-liked-svg" className={classSvgLiked} role="img" height="24" width="24" aria-hidden="true" >
                                                <path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>)
                        })}
                    </div>
                </section>
            }
            <section className="filter-cards-container">
                <h2>Browse all</h2>
                <section className="filter-cards-preview">
                    {geners.map((gener, idx) =>
                        <div key={idx} className="filter-card" style={{ backgroundColor: gener.bgc }}>
                            <div className="card-title">{gener.name}</div>
                            <img className="filter-img" src={gener.imgUrl} alt="filter img" />
                        </div>
                    )}
                </section>
            </section>
        </main>
    )
}


























































































// // import { NavLink } from "react-bootstrap"
// import { useEffect, useState } from "react"
// import { useLocation } from "react-router-dom"

// import { Loader } from "../cmps/loader.jsx"
// import { stationService } from "../services/station.service.js"
// import { youtubeService } from "../services/youtube.service.js"
// import { utilService } from "../services/util.service.js"
// import { useDispatch } from "react-redux"
// import { SET_SONG_IDX, LOAD_STATION_FOR_PLAYER } from "../store/player/player.reducer.js";
// import { actionToggleSongToLikedSong } from "../store/station/station.actions.js"

// export function Search({ playStation }) {

//     // for later use    
//     // const recentSearches = useRef('')

//     const [songsFromSearch, setSongsFromSearch] = useState(null)
//     const dispatch = useDispatch()
//     const location = useLocation()
//     const geners = stationService.getMusicGeners()

//     const songKey = location.search.slice(11)
//     console.log('songKey from location', songKey)

//     useEffect(() => {
//         console.log('useEffect activated')
//         getSongsFromSearch()

//         //for later use
//         // recentSearches.current = recentSearches.current + songKey
//     }, [songKey])

//     async function getSongsFromSearch() {
//         if ((songKey) && (!songsFromSearch)) {
//             let searchData = utilService.loadFromStorage(songKey)
//             if (!searchData || !searchData.length) {
//                 youtubeService.getServerSideSearch(songKey)
//                     .then(songs => {
//                         console.log('songs from youtube search', songs)
//                         // Should we save an object with all the songs results, or many different keys?
//                         utilService.saveToStorage(songKey, songs)
//                         setSongsFromSearch(songs)
//                     })
//                     .catch((err) => {
//                         console.log('cannot find that particular song', err)
//                         // is there any reason to throw err?
//                         throw err
//                     })
//             }
//             console.log('Loading songs from localStorage')
//             setSongsFromSearch(searchData)
//         }
//     }

//     function onPlaySong(songIdx) {
//         playStation()
//         dispatch({ type: SET_SONG_IDX, songIdx })
//     }

//     async function toggleLikedSong(song) {
//         console.log('toggleLikedSong')

//         const update = await actionToggleSongToLikedSong(song)
//         console.log('update', update)
//         setSongsFromSearch(prev => [...prev])

//     }

//     function onFilterCardClicked(filterByGener) {
//         // console.log('A filter was clicked', filterByGener)
//     }
// console.log('songsFromSearch', songsFromSearch)
//     if (!geners) <Loader />
//     return (
//         <main className="main-search-container">
//             {/* SONGS FROM SEARCH */}
//             {songsFromSearch &&
//                 <section className="search-results-songs-container">
//                     <h2>Songs</h2>
//                     <header className="search-results-header">
//                         <div className="number-sign">#</div>
//                         <div className="song-title">TITLE</div>
//                         <div className="song-album"></div>
//                         <div className="song-duration">
//                             <i className="fa-regular fa-clock"></i>
//                         </div>
//                     </header>
//                     <div className="search-results-song-list">
//                         {songsFromSearch.map((song, idx) => {
//                             const classSvgLiked = (song.liked) ? 'song-liked-svg' : 'song-dis-liked-svg'
//                             const titleSvgLiked = (!song.liked) ? 'Add to Liked Songs' : 'Remove from Liked Songs'
//                             return (
//                                 <div key={song.id} className="song-list-line" onClick={() => onPlaySong(idx)} >
//                                     <div className="song-index">
//                                         {idx + 1}
//                                     </div>
//                                         <img className="searched-song-img" src={song.imgUrl} alt="Magnifing glass" />
//                                         <div className="searched-song-title">
//                                             {song.createdBy}
//                                         </div>
                                        
//                                     <div className="searched-song-options">
//                                         <div className="song-list-duration">
//                                            0{song.duration.min} : {song.duration.sec}
//                                         </div>
//                                         <button className="add-like-to-song song-action " title={titleSvgLiked} onClick={() => toggleLikedSong(song)} >
//                                             <svg id="song-liked-svg" className={classSvgLiked} role="img" height="24" width="24" aria-hidden="true" >
//                                                 <path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
//                                             </svg>
//                                         </button>
//                                     </div>
//                                 </div>)
//                         })}
//                     </div>
//                 </section>
//             }

//             {/* RECENT SEARCHES - for later use*/}
//             {/* {recentSearches.current && */}
//             {/* <section className="recent-searches-container"> */}
//             {/* <h2>Popular Searchs</h2> */}
//             {/* <section className="filter-cards-preview"> */}
//             {/* after every search save the first result: */}
//             {/* - searchWord */}
//             {/* - imgUrl */}
//             {/* add button that starts youtube search */}
//             {/* onClick={() => getSongsFromSearch()} */}
//             {/* render as a card just like thr filter cards */}
//             {/* </section> */}
//             {/* </section> */}
//             {/* } */}

//             {/* FILTER CARDS */}
//             {/* TODO: */}
//             <section className="filter-cards-container">
//                 <h2>Browse all</h2>
//                 <section className="filter-cards-preview">
//                     {geners.map((gener, idx) =>
//                         // <NavLink to={`/${gener.name}`} key={idx} >
//                         <div key={idx} className="filter-card" onClick={onFilterCardClicked(gener)} style={{ backgroundColor: gener.bgc }}>
//                             <div className="card-title">{gener.name}</div>
//                             <img className="filter-img" src={gener.imgUrl} alt="filter img" />
//                             {/* <button className='play'>Play</button> */}
//                         </div>
//                         // </NavLink>

//                     )}
//                 </section>
//             </section>

//         </main>
//     )
// }
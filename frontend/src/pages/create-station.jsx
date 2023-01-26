import { useEffect, useState, useRef } from "react"
// import { useNavigate } from "react-router-dom"

import { utilService } from "../services/util.service.js"
import { addStation } from "../store/station/station.actions.js"
import { stationService } from "../services/station.service.js"
import { youtubeService } from "../services/youtube.service.js"
import { StationDetails } from "../pages/station-details.jsx"
import { Loader } from "../cmps/loader.jsx"


export function CreateStation() {

    // const txtSearchKey = useRef(utilService.debounce(getSearchReasults, 500))
    const [txtSearchPlaceHolder, setTxtSearchPlaceHolder] = useState('What do you want to listen to ?')
    const [txtSearchKey, setTxtSearchKey] = useState('')

    const [songsFromSearch, setSongsFromSearch] = useState(null)

    const [station, setStation] = useState(null)
    const [stationSongs, setStationSongs] = useState(null)

    useEffect(() => {
        const newStation = (stationService.getEmptyStation())
        saveNewStation(newStation)
    }, [])

    function handleChange(ev) {
        ev.preventDefault()
        // console.log('ev :>> ', ev)
        const { target } = ev
        // console.log('target', target)
        const { value } = target
        // console.log('value :>> ', value)
        setTxtSearchPlaceHolder(value)
        setTxtSearchKey(value)
    }

    async function saveNewStation(station) {
        station = await addStation(station)
        setStation(station)
        // console.log('station added:>> ', station)
    }

    async function getSearchReasults(val) {
        if (val.length === 0) {
            setSongsFromSearch(null)
            return
        }
        const results = await youtubeService.getServerSideSearch(val)
        // console.log('results from search', results)
        setSongsFromSearch(results)
    }

    function onAddSong(song) {
        setStationSongs(prevSongs => [...prevSongs, song])
        handleChange('songs', [...stationSongs, song])
    }

    // console.log('CRAETED STATION', station)



    // Add debouncer (here?)
    async function onSearch(ev) {
        // console.log('on serch ev', ev)
        // console.log('object :>> ', ev.target);
        // console.log('object :>> ', ev.target.value);
        ev.preventDefault()
        // console.log('onSearch', txtSearchKey)
        youtubeService.getServerSideSearch(txtSearchKey).then(res => {
            let songs = res.items
            // console.log('youtubeService', songs)
            setSongsFromSearch(songs)
        })
    }

    console.log('songsFromSearch', songsFromSearch)
    if (songsFromSearch) console.log('imgUrl', songsFromSearch[0].snippet.thumbnails.default.url)

    if (!station) <Loader />
    return (
        <section className="create-station-container" >
            {/* <StationDetails onAddSong={onAddSong} /> */}
            <h1> Station details</h1 >

            <div className='create-station-search-input'>
                <button className="search-key-btn">
                    <svg role="img" height="24" width="24" aria-hidden="true" className="search-key Svg-sc-ytk21e-0 uPxdw mOLTJ2mxkzHJj6Y9_na_" viewBox="0 0 24 24" data-encore-id="icon"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
                        <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path></svg>
                </button>
                <form onSubmit={onSearch}>
                    <input className='search-key-input' type="text"
                        name="searchKey"
                        value={txtSearchKey}
                        placeholder={txtSearchPlaceHolder}
                        onChange={handleChange} />
                </form>
            </div>
            {
                songsFromSearch &&
                <div className="search-results">
                    {songsFromSearch.map((song, idx) => {
                        // return (
                            <article role="button" key={song.id}>
                                <li className="song-list-li grid">
                                    <section>
                                        <div>
                                            <img className="song-img" src={song.snippet.thumbnails.default.url} alt="Magnifing glass" />
                                        </div>
                                        <section>
                                            <p>{song.title}</p>
                                        </section>
                                    </section>
                                    <div className="song-list-artist">
                                        {song.snippet.channelTitle}
                                    </div>
                                    <div className="song-list-add-date">
                                        {utilService.randomPastTime()}
                                    </div>
                                    <button className="add-song-btn" onClick={() => onAddSong(song)}>Add</button>
                                </li>
                            </article>
                        // )
                    }
                        // <div className="search-result" key={song.id}>
                        //     {<button className="add-song-btn" onClick={() => onAddSong(song)}>+</button>}
                        //     <img src={song.imgUrl} onClick={() => console.log('set song to play')} />
                        //     <div className="song-details">
                        //         <h4>{song.title} </h4>
                        //         <p>{song.channelTitle}</p>
                        //     </div>
                        // </div>
                    )}
                </div>
            }
            <div className="songs-from-search">

            </div>
        </section >
    )
}
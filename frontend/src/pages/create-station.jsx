import { useEffect, useState, useRef } from "react"
// import { useNavigate } from "react-router-dom"
import { loadFromStorage,saveToStorage } from "../services/storage.service.js"
import { utilService } from "../services/util.service.js"
// import { addStation } from "../store/station/station.actions.js"
import { stationService } from "../services/station.service.js"
import { youtubeService } from "../services/youtube.service.js"
// import {StationHeader} from "../cmps/station-header.jsx"
// import { StationDetails } from "../pages/station-details.jsx"
import { Loader } from "../cmps/loader.jsx"


export function CreateStation() {

    const [txtSearchPlaceHolder, setTxtSearchPlaceHolder] = useState('What do you want to listen to ?')
    const [txtSearchKey, setTxtSearchKey] = useState('')

    const [songsFromSearch, setSongsFromSearch] = useState(null)

    const [station, setStation] = useState(null)
    const [stationSongs, setStationSongs] = useState(null)

    useEffect(() => {
        // saveNewStation()
        const newStation = stationService.getEmptyStation()
        console.log('newStation', newStation)
        setStation(newStation)
    }, [])

    // async function saveNewStation() {
    //     const newStation = stationService.getEmptyStation()
    //     // newStation.utilService.makeId()
    //     setStation(newStation)
    // }

    function handleChange({ target }) {
        let { value, field } = target
        setStation(prevStation => ({ ...prevStation, [field]: value }))
        setTxtSearchKey(value)
    }

    // async function getSearchReasults(val) {
    //     if (val.length === 0) {
    //         setSongsFromSearch(null)
    //         return
    //     }
    //     const results = await youtubeService.getServerSideSearch(val)
    //     setSongsFromSearch(results)
    // }

    function onAddSong(song) {
        // let station = []
        station.songs.push(song)
        console.log('station', station)
        console.log('station id: ', station._id)
        setStation(station)
    }

    async function onSearch(ev) {
        ev.preventDefault()
        let searchData = utilService.loadFromStorage(txtSearchKey)
        if(!searchData || !searchData.length){
            youtubeService.getServerSideSearch(txtSearchKey).then(songs => {
                console.log('songs come from api', songs)
                searchData = songs
                utilService.saveToStorage(txtSearchKey,searchData)
                setSongsFromSearch(searchData)
            })
        }
        setSongsFromSearch(searchData)
    }

    // function onSaveStation() {
    //     onSaveStation(station)
    // }

    if (!station) <Loader />
    return (
        <section className="create-station-container">
            {/* <StationHeader station={station} /> */}
            {/* <StationDetails onSaveStation={onSaveStation} /> */}
            {/* <StationDetails /> */}
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
                        return (
                            <article key={song.id} role="button">
                                <li className="song-list-li grid">
                                    <section>
                                        <div>
                                            <img className="song-img" src={song.imgUrl} alt="Magnifing glass" />
                                        </div>
                                        <section>
                                            <p>{song.title}</p>
                                        </section>
                                    </section>
                                    <div className="song-list-artist">
                                        {song.title}
                                    </div>
                                    <div className="song-list-add-date">
                                        {utilService.randomPastTime()}
                                    </div>
                                    <button className="add-song-btn" onClick={() => onAddSong(song)}>Add</button>
                                </li>
                            </article>
                        )
                    })}
                </div>
            }
        </section>
    )
}








// <div className="search-result" key={song.id}>
//     {<button className="add-song-btn" onClick={() => onAddSong(song)}>+</button>}
//     <img src={song.imgUrl} onClick={() => console.log('set song to play')} />
//     <div className="song-details">
//         <h4>{song.title} </h4>
//         <p>{song.channelTitle}</p>
//     </div>
// </div>
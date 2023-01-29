import { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { utilService } from "../services/util.service.js"
import { stationService } from "../services/station.service.js"
import { youtubeService } from "../services/youtube.service.js"
import { StationHeader } from "../cmps/station-header.jsx"
import { SongList } from "../cmps/song-list.jsx"
import { Loader } from "../cmps/loader.jsx"
import { func } from "prop-types"
import { addStation, updateStation } from "../store/station/station.actions.js"
import { UPDATE_STATION } from "../store/station/station.reducer.js"
import { useDispatch } from "react-redux"

export function CreateStation() {
    const dispatch = useDispatch()

    const [station, setStation] = useState(null)
    const [currStation, setCurrStation] = useState(null)
    const stations = useSelector((storeState) => storeState.stationModule.stations)
    const [txtSearchPlaceHolder, setTxtSearchPlaceHolder] = useState('What do you want to listen to ?')
    const [txtSearchKey, setTxtSearchKey] = useState('')
    const [songsFromSearch, setSongsFromSearch] = useState(null)
    const [check, setCheck] = useState(false)

    useEffect(() => {
        loadNewStation()
    }, [])

    async function loadNewStation() {
        const emptyStation = stationService.getEmptyStation()
        const newStation = await addStation(emptyStation)
        setStation(newStation) //to station store

        if (stations) console.log('all ♥♥♥', stations)
    }

    function handleChange({ target }) {
        let { value, field } = target
        setTxtSearchKey(value)
    }

    async function onAddSong(song) {

        // let durationAPI = await youtubeService.getSongDuration(song.id)
        // console.log('durationAPI', durationAPI)
        station.songs.push(song)
        console.log('newStation', station)

        updateStation(station)
    }

    async function onSearch(ev) {
        ev.preventDefault()
        let searchData = utilService.loadFromStorage(txtSearchKey)
        if (!searchData || !searchData.length) {
            youtubeService.getServerSideSearch(txtSearchKey).then(songs => {
                console.log('songs come from api', songs)
                searchData = songs
                utilService.saveToStorage(txtSearchKey, searchData)
                setSongsFromSearch(searchData)
            })
        }
        setSongsFromSearch(searchData)
    }

    function onSaveStation() {
        onSaveStation(station)
    }

    if (!station || station === null) return <Loader />
    return (
        <section className="create-station-container ">
            {station && <StationHeader station={station} />}
            {station.songs.length > 0 && <SongList station={station} />}

            {/* <div className='searchInput-container flex'>
                        <button className="search-key-btn" onClick={onSearch}>
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
                    </div> */}

            <div className='create-station-search-input'>
                <form className="" onSubmit={onSearch}>
                    <input className='search-key-input' type="text"
                        name="searchKey"
                        value={txtSearchKey}
                        placeholder={txtSearchPlaceHolder}
                        onChange={handleChange} />
                    <button className="search-key-btn">
                        <svg role="img" height="24" width="24" aria-hidden="true" className="search-key Svg-sc-ytk21e-0 uPxdw mOLTJ2mxkzHJj6Y9_na_" viewBox="0 0 24 24" data-encore-id="icon"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
                            <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path></svg>
                    </button>

                </form>
            </div>
            {
                songsFromSearch &&
                <div className="search-results">
                    <ul>
                        {songsFromSearch.map((song, idx) => {
                            console.log('song', song)
                            return (
                                <article key={song.id} role="button">
                                    <li className="song-search-li grid">
                                        <div>
                                            <img className="search-song-img" src={song.imgUrl} alt="Magnifing glass" />
                                        </div>
                                        <div>
                                            <p>{song.title}</p>
                                        </div>
                                        <div>
                                            <button className="add-song-btn" onClick={() => onAddSong(song)}>Add</button>
                                        </div>
                                    </li>
                                </article>
                            )
                        })}
                    </ul>
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
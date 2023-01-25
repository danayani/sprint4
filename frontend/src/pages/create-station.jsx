import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { saveStation } from "../store/station/station.actions"
import { stationService } from "../services/station.service"
import { StationDetails } from "../pages/station-details.jsx"
// import { SearchYoutube } from "../cmps/search-youtube.jsx"

export function CreateStation() {
    const navigate = useNavigate()
    const [stationSongs, setStationSongs] = useState(station.songs)
    const [station, setStation] = useState(null)

    useEffect(() => {
        const newStation = (createEmptyStation())
        setStation(newStation)
    }, [])

    async function createEmptyStation() {
        const newStation = await saveStation(stationService.getEmptyStation())
        setStation(newStation)
    }

    async function onSaveStation(station) {
        try {
            if (!station.name) station.name = 'My Playlist'
            await saveStation(station)
            navigate('/')
        } catch (err) {
            console.error('cannot save station', err)
            throw err
        }
    }

    function handleChange(field, val) {
        setStation(prevStation => ({ ...prevStation, [field]: val }))
    }

    function onAddSong(song) {
        setStationSongs(prevSongs => [...prevSongs, song])
        handleChange('songs', [...stationSongs, song])
    }

    if (!station) return <h1>Loading...</h1>
    return (
        <section className="create-station-container">
            <StationDetails onAddSong={onAddSong} />
            {/* <SearchYoutube onAddSong={onAddSong} isSearchingSongs={true} /> */}

            {/* <div className=' flex'>
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
            </div> */}

        </section>
    )
}
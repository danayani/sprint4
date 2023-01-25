
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

import { youtubeService } from "../services/youtube.service.js"
import { utilService } from "../services/util.service.js"
import { loadStations } from "../store/station/station.actions.js"
import { setSongToPlayer } from "../store/player/player.action.js"
import { SecondStationList } from "./second-stations-list.jsx"

export function SearchYoutube({ onAddSong, isSearchingSongs }) {
    const stations = useSelector((storeState) => storeState.stationModule.stations)
    const [search, setSearch] = useState('')
    const [songsFromSearch, setsongsFromSearch] = useState(null)
    const searchTxtForSongs = useRef(utilService.debounce(getSearchReasults, 500))

    
    useEffect(() => {
        if (isSearchingSongs) return
        loadStations()
    }, [])


    async function getSearchReasults(val) {
        if (val.length === 0) {
            setsongsFromSearch(null)
            return
        }
        const results = await youtubeService.getYoutubeReasults(val)
        console.log('results from search', results)
        setsongsFromSearch(results)
    }

   
    function handleChange({ target }) {
        const { value } = target
        setSearch(value)
        searchTxtForSongs.current(value)
    } 


    // if (!stations) return <h1>Loading...</h1>
    return (
        <main className="main-search-container" >
            <div className="search-container"> 
                <input className={`search-key-input ${isSearchingSongs ? "add-songs-search" : ""}`}
                    type='txt' value={search}
                    placeholder={isSearchingSongs ? 'Search for songs' : 'What do you want to listen to?'}
                    onChange={handleChange} 
                    />
            </div>

            {songsFromSearch ? <div className="search-results">
                {songsFromSearch.map(song => <div className="search-result" key={song.id}>
                    {isSearchingSongs && <button className="add-song-btn" onClick={() => onAddSong(song)}>+</button>}
                    <img src={song.imgUrl} onClick={() => console.log('set song to play')} />
                    <div className="song-details">
                        <h4>{song.title} </h4>
                        <p>{song.channelTitle}</p>
                    </div>
                </div>
                )}
            </div>
                :
                !isSearchingSongs &&
                <div>hi</div>
            }
        </main>
    )
}

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { addStation, updateStation, removeStation } from '../store/station/station.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stationService } from '../services/station.service.js'
// import { stationService } from '../services/station.service.local.js'
import { youtubeService } from '../services/youtube.service.js'

// loadStations
//with grid
//playlist (station) card

export function Library() {
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const [itemList2, setListItem] = useState([])
    const [itemListSearch, setListItemSearch] = useState([])
    const [itemInfo, setItemInfo] = useState([])

    useEffect(() => {
        youtubeService.getServerSideProps().then(res => {
            const songs = res.data.items
            setListItem(songs)
        })


        // youtubeService.getServerSideSearch().then(res => {
        //     const songs = res
        //     console.log('song from lib', songs)
        //     setListItemSearch(songs)
        // })
        
        youtubeService.getPlaylistInfo().then(res => {
            setItemInfo(res)
        })

    }, [])

    return (
        <div>
            <h3>Stations App</h3>
            <h3>Music </h3>

            {console.log('search list', itemListSearch)}
            {console.log('itemInfo', itemInfo)}
            {itemList2.map((item) => {
                return <iframe key={item.id} id="player" type="text/html" width="640" height="390"
                    src={`http://www.youtube.com/embed/${item.snippet.resourceId.videoId}`}
                    frameBorder="0"></iframe>
            })}






{/* 
            <div className='footer-spacer'>
                <h2 className='footer-filler'></h2>
                <hr />
                <h2 className='footer-filler'></h2>
            </div> */}
        </div>
    )
}


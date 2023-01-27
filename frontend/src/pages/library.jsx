import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { addStation, updateStation, removeStation } from '../store/station/station.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stationService } from '../services/station.service.js'
import { youtubeService } from '../services/youtube.service.js'

export function Library() {
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const [itemList2, setListItem] = useState([])
    const [itemListSearch, setListItemSearch] = useState([])
    const [itemInfo, setItemInfo] = useState([])

    useEffect(() => {
       
        let songId = 'YykjpeuMNEk'
        youtubeService.getSongDuration(songId).then(res => {
            console.log('getSongDuration', res)
        })

        

    }, [])

    // <Loader />
    return (
        <div>
            <h3>Stations App</h3>
            <h3>Music </h3>
        </div>
    )
}


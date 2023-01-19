// List of user stations

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStations,} from '../store/station.actions.js'

import { stationService } from '../services/station.service.js'
// import { stationService } from '../services/station.service.local.js'
import { youtubeService } from '../services/youtube.service.js'


//with grid
//playlist (station) card
export function Library() {

    const stations = useSelector(storeState => storeState.stationModule.stations)
    const dataYT = youtubeService.getServerSideProps().then(res => res.data)

    useEffect(() => {
        loadStations()
    }, [])

    // async function onRemoveStation(stationId) {
    //     try {
    //         await removeStation(stationId)
    //         showSuccessMsg('Station removed')
    //     } catch (err) {
    //         showErrorMsg('Cannot remove station')
    //     }
    // }

    // async function onAddStation() {
    //     const station = stationService.getEmptyStation()
    //     station.vendor = prompt('Vendor?')
    //     try {
    //         const savedStation = await addStation(station)
    //         showSuccessMsg(`Station added (id: ${savedStation._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add station')
    //     }
    // }

    // async function onUpdateStation(station) {
    //     const price = +prompt('New price?')
    //     const stationToSave = { ...station, price }
    //     try {
    //         const savedStation = await updateStation(stationToSave)
    //         showSuccessMsg(`Station updated, new price: ${savedStation.price}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot update station')
    //     }
    // }

    // function onAddStationMsg(station) {
    //     console.log(`TODO Adding msg to station`)
    // }

    return (
        <div>
            <h3>Stations App</h3>
            <h3>Music </h3>
            {console.log('data yt', dataYT)}

            <main>
                <button>Add Station</button>
                <ul className="station-list">
                    {stations.map(station =>
                        <li className="station-preview" key={station._id}>
                            <h4>{station}</h4>
                            
                        </li>)
                    }
                </ul>
            </main>
        </div>
    )
}


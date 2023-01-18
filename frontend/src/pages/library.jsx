// List of user stations

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStations, addStation, updateStation, removeStation } from '../store/station.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stationService } from '../services/station.service.local.js'


//with grid
//playlist (station) card
export function StationIndex() {

    const stations = useSelector(storeState => storeState.stationModule.stations)

    useEffect(() => {
        loadStations()
    }, [])

    async function onRemoveStation(stationId) {
        try {
            await removeStation(stationId)
            showSuccessMsg('Station removed')            
        } catch (err) {
            showErrorMsg('Cannot remove station')
        }
    }

    async function onAddStation() {
        const station = stationService.getEmptyStation()
        station.vendor = prompt('Vendor?')
        try {
            const savedStation = await addStation(station)
            showSuccessMsg(`Station added (id: ${savedStation._id})`)
        } catch (err) {
            showErrorMsg('Cannot add station')
        }        
    }

    async function onUpdateStation(station) {
        const price = +prompt('New price?')
        const stationToSave = { ...station, price }
        try {
            const savedStation = await updateStation(stationToSave)
            showSuccessMsg(`Station updated, new price: ${savedStation.price}`)
        } catch (err) {
            showErrorMsg('Cannot update station')
        }        
    }

    function onAddStationMsg(station) {
        console.log(`TODO Adding msg to station`)
    }

    return (
        <div>
            <h3>Stations App</h3>
            <main>
                <button onClick={onAddStation}>Add Station</button>
                <ul className="station-list">
                    {stations.map(station =>
                        <li className="station-preview" key={station._id}>
                            <h4>{station.vendor}</h4>
                            <h1>⛐</h1>
                            {/* <p>Price: <span>${station.price.toLocaleString()}</span></p> */}
                            {/* <p>Owner: <span>{station.owner && station.owner.fullname}</span></p> */}
                            <div>
                                <button onClick={() => { onRemoveStation(station._id) }}>x</button>
                                <button onClick={() => { onUpdateStation(station) }}>Edit</button>
                            </div>

                            <button onClick={() => { onAddStationMsg(station) }}>Add station msg</button>
                        </li>)
                    }
                </ul>
            </main>
        </div>
    )
}
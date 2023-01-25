
import { stationService } from '../../services/station.service'
import { ADD_STATION, REMOVE_STATION, SET_STATIONS, UPDATE_STATION, UPDATE_CURR_STATION } from "./station.reducer.js"
import { store } from '../store'


// Action Creators:
export async function loadStations(filterBy) {
    try {
        const stations = await stationService.query(filterBy)
        store.dispatch({ type: SET_STATIONS, stations })
    } catch (err) {
        console.error('Cannot load stations', err)
        throw err
    }
}

export async function addStation(station) {
    try {
        const newStation = await stationService.save(station)
        store.dispatch({ type: ADD_STATION, station: newStation })
        return newStation
    } catch (err) {
        console.log('Had issues to get current station', err)
        throw err
    }
}

export async function updateStation(station) {
    try {
        const updatedStation = await stationService.save(station)
        store.dispatch({ type: UPDATE_STATION, station: updatedStation })
    } catch (err) {
        console.log('Had issues to get current station', err)
        throw err
    }
}

// export async function saveStation(station) {
//     try{
//         const type = (station._id) ? UPDATE_STATION : ADD_STATION
//         const savedStation = await stationService.save(station)
//         store.dispatch({ type: type, station: savedStation })
//         return savedStation
//     } catch(err) {
//         console.error('Cannot save station', err)
//         throw err
//     }
// }

export async function removeStation(stationId) {
    try {
        await stationService.remove(stationId)
        store.dispatch({ type: REMOVE_STATION, stationId })
    } catch (err) {
        console.error('Cannot remove station', err)
        throw err
    }
}

export async function loadCurrStation (stationId) {
    try {
        const currStation = await stationService.getById(stationId)
        store.dispatch({type: UPDATE_CURR_STATION, currStation})
    } catch (err) {
        console.log('Cannot load currStations', err)
        throw err
    }
}

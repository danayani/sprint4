
import { stationService } from '../../services/station.service'
import { ADD_STATION, REMOVE_STATION, SET_STATIONS, UPDATE_STATION, UPDATE_CURR_STATION } from "./station.reducer.js"
import { store } from '../store'


// Action Creators:

export async function loadStations(filterBy) {
    // console.log('hi from STATION ACTION');
    try {
        const stations = await stationService.query(filterBy)
        console.log('Stations from DB:', stations)
        store.dispatch({ type: SET_STATIONS, stations })
    } catch (err) {
        console.log('Cannot load stations', err)
        throw err
    }
}

export async function loadStationById (stationId) {
    try {
        const currStation = await stationService.get(stationId)
        console.log('Station uploaded successfuly')
        store.dispatch({
            type: UPDATE_CURR_STATION, currStation
        })
    } catch (err) {
        console.log('Cannot load currStations', err)
        throw err
    }
}

export async function saveStation(station) {
    try{
        const newStation = await stationService.save(station)
        store.dispatch({ type: ADD_STATION, station: newStation })
        return newStation
    } catch(err) {
        console.log('Cannot save station')
        throw err
    }
}

export async function removeStation(stationId) {
    try {
        await stationService.remove(stationId)
        store.dispatch({ type: REMOVE_STATION, stationId })
    } catch (err) {
        console.log('Cannot remove station', err)
        throw err
    }
}

export async function updateStation(station) {
    try {
        const updatedStation = await stationService.save(station)
        store.dispatch({ type: UPDATE_STATION, station: updatedStation})
    } catch (err) {
        console.log('Cannot upadte station', err)
        throw err
    }  
}

// export async function addStation(station) {
//     try {
//         const savedStation = await stationService.save(station)
//         console.log('Added station', savedStation)
//         store.dispatch(getActionAddStation(savedStation))
//         return savedStation
//     } catch (err) {
//         console.log('Cannot add station', err)
//         throw err
//     }
// }

    
    
    // export function getActionRemoveStation(stationId) {
    //     return {
    //         type: REMOVE_STATION,
    //         stationId
    //     }
    // }
    // export function getActionAddStation(station) {
    //     return {
    //         type: ADD_STATION,
    //         station
    //     }
    // }
    // export function getActionUpdateStation(station) {
    //     return {
    //         type: UPDATE_STATION,
    //         station
    //     }
    // }

    // Demo for Optimistic Mutation 
    // (IOW - Assuming the server call will work, so updating the UI first)
    
    // export function onRemoveStationOptimistic(stationId) {
    //     store.dispatch({
    //         type: REMOVE_STATION,
    //         stationId
    //     })
    //     showSuccessMsg('Station removed')
        
    //     stationService.remove(stationId)
    //     .then(() => {
    //         console.log('Server Reported - Deleted Succesfully');
    //     })
    //     .catch(err => {
    //         showErrorMsg('Cannot remove station')
    //         console.log('Cannot load stations', err)
    //         store.dispatch({
    //             type: UNDO_REMOVE_STATION,
    //         })
    //     })
    // }
    
// import { stationService } from "../services/station.service.js";
import { stationService } from '../../services/station.service';
import { store } from '../store'
import { SET_STATIONS, SET_CURR_STATION} from "./station.reducer.js";

// Action Creators:

// export async function loadStations() {
//     try {
//         const stations = await stationService.query()
//         console.log('Stations from DB:', stations)
//         store.dispatch({
//             type: SET_STATIONS,
//             stations
//         })

//     } catch (err) {
//         console.log('Cannot load stations', err)
//         throw err
//     }

// }

export async function loadStationById (stationId) {
    try {
        const currStation = await stationService.get(stationId)
        console.log('Station uploaded successfuly')
        store.dispatch({
            type: SET_CURR_STATION, currStation
        })
    } catch (err) {
        console.log('Cannot load currStations', err)
        throw err
    }
}

// export async function removeStation(stationId) {
//     try {
//         await stationService.remove(stationId)
//         store.dispatch(getActionRemoveStation(stationId))
//     } catch (err) {
//         console.log('Cannot remove station', err)
//         throw err
//     }
// }

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

// export function updateStation(station) {
//     return stationService.save(station)
//     .then(savedStation => {
//         console.log('Updated Station:', savedStation)
//         store.dispatch(getActionUpdateStation(savedStation))
//         return savedStation
//     })
//     .catch(err => {
//             console.log('Cannot save station', err)
//             throw err
//         })
//     }
    
    
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
    
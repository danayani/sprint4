
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import data from '../data/station-data.json'
// console.log('data', data)

const STATION_KEY = 'stationDB'
const stationsData = data
console.log('stationsData from station service', stationsData)

_createStations()

export const stationService = {
    // query,
    getById,
    save,
    remove,
    getEmptyStation,
}
// window.cs = stationService


async function query(filterBy = null) {
    return storageService.query(STATION_KEY)
    // return httpService.get(STORAGE_KEY, filterBy)
}

function getById(stationId) {
    return storageService.get(STATION_KEY, stationId)
    // return httpService.get(`station/${stationId}`)
}

async function remove(stationId) {
    await storageService.remove(STATION_KEY, stationId)
    // return httpService.delete(`station/${stationId}`)
}
async function save(station) {
    var savedStation
    if (station._id) {
        savedStation = await storageService.put(STATION_KEY, station)
        // savedStation = await httpService.put(`station/${station._id}`, station)
    } else {
        // Later, owner is set by the backend
        // station.owner = userService.getLoggedinUser()
        savedStation = await storageService.post(STATION_KEY, station)
        // savedStation = await httpService.post('station', station)
    }
    return savedStation
}

// async function addStationMsg(stationId, txt) {
//     const savedMsg = await httpService.post(`station/${stationId}/msg`, {txt})
//     return savedMsg
// }

function getEmptyStation() {
    return {
        "_id": "",
        "name": "",
        "tags": [],
        "createdBy": { //loggedinUser
            "_id": "",
            "fullname": "",
            "imgUrl": ""
        },
        "likedByUsers": [],
        "songs": [],
        "msgs": []
    }
}

function _createStations() {
    let stations = utilService.loadFromStorage(STATION_KEY)
    if (!stations || !stations.length) {
        stations = stationsData
        utilService.saveToStorage(STATION_KEY, stations)
    }
    return stations
}




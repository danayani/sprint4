import { stationService } from '../../services/station.service'
import { ADD_STATION, REMOVE_STATION, SET_STATIONS, UPDATE_STATION } from "./station.reducer.js"
import { store } from '../store'

const STATION_LIKED_SONGS_ID = '111RDtaf0Y86Q4hby91hqs6NX'

// Action Creators:
export async function loadStations(filterBy) {
    try {
        console.log('loadStations in store')
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
        console.log('add station in store',)
        return newStation
    } catch (err) {
        console.error('Unable to save station', err)
        throw err
    }
}

export async function updateStation(station) {
    try {
        const updatedStation = await stationService.save(station)
        store.dispatch({ type: UPDATE_STATION, station: updatedStation })
    } catch (err) {
        console.error('Unable to save station', err)
        throw err
    }
}

export async function removeStation(stationId) {
    try {
        await stationService.remove(stationId)
        store.dispatch({ type: REMOVE_STATION, stationId })
    } catch (err) {
        console.error('Cannot remove station', err)
        throw err
    }
}

export async function actionToggleSongToLikedSong(song) {
    const likedSongStation = await stationService.getById(STATION_LIKED_SONGS_ID)
    console.log('actionToggleSongToLikedSong', likedSongStation)

    if (!song.liked) likedSongStation.songs.unshift(song)
    else likedSongStation.songs.filter(likedSong => likedSong.id !== song.id)
    
    console.log('actionToggleSongToLikedSong Toggle', likedSongStation)

    updateStation(likedSongStation)

    song.liked = !song.liked
}



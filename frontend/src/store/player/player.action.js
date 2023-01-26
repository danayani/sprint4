import { playerService } from '../../services/player.service.js';
import { stationService } from '../../services/station.service.js';
import { store } from '../store.js'
import { LOAD_STATION_FOR_PLAYER, PLAY_PAUSE_PLAYER, NEXT_SONG, PREVIOUS_SONG, REMOVE_SONG_PLAYER } from './player.reducer.js'
// LOAD_SONGS,


export async function loadCurrPlayingStation(stationId, songIndex = 0) {
    try {
        store.dispatch({ type: LOAD_STATION_FOR_PLAYER, station: await stationService.getById(stationId) })
        getActionPlayPausePlayer()
        return
    } catch (err) {
        console.error(err)
        throw err
    }
}

export function getActionPlayPausePlayer() {
    return store.dispatch({ type: PLAY_PAUSE_PLAYER })
}

export function getActionVolumeChange() {
    // return store.dispatch({ type: PLAY_PAUSE_PLAYER })
}

export function getActionShuffleSongs() {
    // return store.dispatch({ type: PLAY_PAUSE_PLAYER })
}

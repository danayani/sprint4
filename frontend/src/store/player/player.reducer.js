import { playerService } from "../../services/player.service"

export const PLAY_PAUSE_PLAYER = 'PLAY_PLAYER'
// export const LOAD_SONGS = 'LOAD_SONGS'
export const MOVE_SONG = 'MOVE_SONG'
export const LOAD_STATION_FOR_PLAYER = 'LOAD_STATION_FOR_PLAYER'
export const VOLUME_CHANGE = 'VOLUME_CHANGE'
export const SHUFFLE_SONGS = 'SHUFFLE_SONGS'
export const SET_SONG_IDX = 'SET_SONG_IDX'

const initialState = {
    currPlayingStation: null,
    playerState: playerService.getDefaultState(),
    currSongIdx: 0
}

export function playerReducer(state = initialState, action) {
    let playerState
    let songs
    switch (action.type) {
        case PLAY_PAUSE_PLAYER:
            playerState = { ...state.playerState, playing: !state.playerState.playing }
            return { ...state, playerState }
        case MOVE_SONG:
            console.log('NEXT_SONG')
            return
        case LOAD_STATION_FOR_PLAYER:
            console.log('LOAD_STATION_FOR_PLAYER')
            return { ...state, currPlayingStation: action.station }
        case VOLUME_CHANGE:
            return
        case SET_SONG_IDX:
            return {...state, currSongIdx:action.songIdx}


        default:
            return state
    }
}
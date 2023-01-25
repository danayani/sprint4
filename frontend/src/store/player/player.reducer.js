import { playerService } from "../../services/player.service"

export const PLAY_PAUSE_PLAYER = 'PLAY_PLAYER'
export const MOVE_SONG = 'MOVE_SONG'
export const LOAD_STATION_FOR_PLAYER = 'LOAD_STATION_FOR_PLAYER'

const initialState = { //אם אני רוצה שכמה קומפוננטות ישתמשו במידע
    currPlayingStation: {},
    playerState: playerService.getDefaultState(),
    songs: [],
    currSongIndex: 0
}

export function playerReducer(state = initialState, action) {
    let playerState
    switch (action.type) {
        case PLAY_PAUSE_PLAYER:
            playerState = { ...state.playerState, playing: !state.playerState.playing }
            return { ...state, playerState }
        case MOVE_SONG:
            console.log('NEXT_SONG')
            return
        case LOAD_STATION_FOR_PLAYER:
            return { ...state, currPlayingStation : action.station }
        default:
            return state
    }
}
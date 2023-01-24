import { playerService } from "../../services/player.service"

export const PLAY_PAUSE_PLAYER = 'PLAY_PLAYER'
export const NEXT_SONG = 'NEXT_SONG'
export const PREVIOUS_SONG = 'PREVIOUS_SONG'
export const REMOVE_SONG_PLAYER = 'REMOVE_SONG_PLAYER'


console.log('in player reducer')

const initialState = { //אם אני רוצה שכמה קומפוננטות ישתמשו במידע
    currPlayingstation: {},
    playerState: playerService.getDefaultState(),
    songs: [],
    currSongIndex: 0
}
export function playerReducer(state = initialState, action) {
    let songs
    let playerState
    switch (action.type) {
        case PLAY_PAUSE_PLAYER:
            playerState = { ...state.playerState, playing: !state.playing }
            return { ...state, playerState }
        case NEXT_SONG:
            console.log('NEXT_SONG')
            return 
        case REMOVE_SONG_PLAYER:
            // songs = state.songs.filter(toy => toy._id !== action.toyId)
            return 
        default:
            return state

    }

}
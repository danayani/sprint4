import { playerService } from "../../services/player.service"

export const SET_PLAYER = 'SET_PLAYER'
export const SET_SONG_ID = 'SET_SONG_ID'
console.log('in player reducer')

const initialState = { //אם אני רוצה שכמה קומפוננטות ישתמשו במידע
    station: {},
    playerState: playerService.getDefaultState(),
    songs: [],
    currSongIndex: 0
}
export function playerReducer(state = initialState, action) {
    let songs
    switch (action.type) {
        case SET_PLAYER:
            return { ...state, player: action.player }
        case SET_SONG_ID:
            return { ...state, songId: action.songId }
        default:
            return state

    }

}
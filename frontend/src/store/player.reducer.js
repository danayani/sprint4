

export const SET_PLAYER = 'SET_PLAYER'
export const SET_SONG_ID = 'SET_SONG_ID'

const initialState = {
    player: {},
    songId: null
}

export function playerReducer(state = initialState, action){
    switch (action.type) {
        case SET_PLAYER:
            return {...state, player: action.player }
        case SET_SONG_ID:
            return {...state, songId: action.songId }
        default: 
            return { state }
    }
}
import { store } from './store.js'
import { SET_PLAYER ,SET_SONG_ID } from '../store/player.reducer.js'

export async function loadPlayer(player) {
    try {
        console.log('player from actions:',player);
        store.dispatch({ type: SET_PLAYER, player })
    } catch (err) {
        console.log('Cant load player', err)
        throw err
    }
}
export async function setSongId(songId) {
    try {
        store.dispatch({ type: SET_SONG_ID, songId })
    } catch (err) {
        console.log('Cant set song id', err)
        throw err
    }
}
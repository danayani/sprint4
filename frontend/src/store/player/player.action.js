import { playerService } from '../../services/player.service.js';
import { store } from '../store.js'
import { PLAY_PAUSE_PLAYER, NEXT_SONG, PREVIOUS_SONG, REMOVE_SONG_PLAYER } from './player.reducer'

export async function loadPlayer(player) {
    try {
        console.log('player from actions:', player);
        // store.dispatch({ type: SET_PLAYER, player })
    } catch (err) {
        console.log('Cant load player', err)
        throw err
    }
}

export function getActionPlayPausePlayer() {
    console.log('action from cmp player')
    return store.dispatch({ type: PLAY_PAUSE_PLAYER })
}
//   export function getActionAddReview(review) {
//     return { type: 'ADD_REVIEW', review }
//   }
//   export function getActionSetWatchedUser(user) {
//     return { type: 'SET_WATCHED_USER', user }
//   }

// export async function loadToys(filterBy) {
//     try {
//         const toys = await toyService.query(filterBy)
//         store.dispatch({ type: SET_TOYS, toys })

//     } catch (err) {
//         console.log('Had issues loading toys')
//         throw err
//     }
// }
import { userService } from '../../services/user.service.js'

// export const INCREMENT = 'INCREMENT'
// export const DECREMENT = 'DECREMENT'
// export const CHANGE_COUNT = 'CHANGE_COUNT'
export const SET_USER = 'SET_USER'
// export const SET_WATCHED_USER = 'SET_WATCHED_USER'
// export const REMOVE_USER = 'REMOVE_USER'
// export const SET_USERS = 'SET_USERS'
// export const SET_SCORE = 'SET_SCORE'

const initialState = {
    // count: 10,
    user: userService.getLoggedinUser(),
    // user: null,
    // users: [],
    // watchedUser : null
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        // case INCREMENT:
        //     newState = { ...state, count: state.count + 1 }
        //     break
        // case DECREMENT:
        //     newState = { ...state, count: state.count - 1 }
        //     break
        // case CHANGE_COUNT:
        //     newState = { ...state, count: state.count + action.diff }
        //     break
        case SET_USER:
            return { ...state, user: action.user }

        // case SET_WATCHED_USER:
        //     return { ...state, watchedUser: action.user }
            
        // case REMOVE_USER:
        //     return { ...state, users: state.users.filter(user => user._id !== action.userId) }
        // case SET_USERS:
        //     return { ...state, users: action.users }

        // case SET_SCORE:
        //     newState = { ...state, user: { ...state.user, score: action.score } }
        //     break
        default:
            return state
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)

}

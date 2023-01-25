import { combineReducers, legacy_createStore as createStore } from 'redux'
import { stationReducer } from './station/station.reducer.js'
import { playerReducer } from './player/player.reducer.js'
import { userReducer } from './user/user.reducer.js'

const rootReducer = combineReducers({
    stationModule: stationReducer,
    playerModule: playerReducer,
    userModule: userReducer
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)



// For debugging only
store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})





export const ADD_STATION = 'ADD_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const SET_STATIONS = 'SET_STATIONS'
export const UPDATE_STATION = 'UPDATE_STATION'
export const UPDATE_CURR_STATION = 'UPDATE_CURR_STATION'
// TODO: Add like-song

const initialState = {
    stations: null,
    currStation: null
}

export function stationReducer(state = initialState, action) {
    let stations
    switch (action.type) {
        case SET_STATIONS:
            return { ...state, stations: action.stations }
        case REMOVE_STATION:
            stations = state.stations.filter(station => station._id !== action.stationId)
            return { ...state, stations }
        case ADD_STATION:
            stations = [...state, action.station]
            return { ...state, stations }
        case UPDATE_STATION:
            stations = state.stations.map(station => (station._id === action.station._id) ? action.station : station)
            return { ...state, stations }
        case UPDATE_CURR_STATION:
            return { ...state, currStation: action.currStation }
        default:
            return state
    }
}

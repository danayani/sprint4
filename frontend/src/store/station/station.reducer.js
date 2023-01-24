export const SET_STATIONS = 'SET_STATIONS'
export const SET_CURR_STATION = 'SET_CURR_STATIONS'
export const ADD_STATION = 'ADD_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'

const initialState = {
    stations: [],
    currStation: {}
}


export function stationReducer(state = initialState, action) {
    var stations
    switch (action.type) {
        case SET_STATIONS:
            return { ...state, stations: action.stations }
        case SET_CURR_STATION:
            return { ...state, currStation: action.currStation }
        case REMOVE_STATION:
            stations = state.stations.filter(station => station._id !== action.stationId)
            return { ...state, stations }
        case ADD_STATION:
            stations = [...state.stations, action.station]
            return { ...state, stations }
        default:
            return state
    }
}

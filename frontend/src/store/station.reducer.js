export const SET_STATIONS = 'SET_STATIONS'
export const SET_CURR_STATION = 'SET_CURR_STATIONS'

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
        default:
            return state
    }
}

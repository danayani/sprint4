import { stationService } from "../../services/station.service"

export const SET_STATIONS = 'SET_STATIONS'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'

const initialState = {
    stations: [],
    filterBy: stationService.getDefaultFilter()
}

export function stationReducer(state = initialState, action) {
    let stations
    switch (action.type) {
        case SET_STATIONS:
            console.log('from reduce SET_STATIONS', state.stations)
            return { ...state, stations: action.stations }
        case REMOVE_STATION:
            stations = state.stations.filter(station => station._id !== action.stationId)
            return { ...state, stations }
        case ADD_STATION:
            stations = [...state.stations, action.station]
            return { ...state, stations }
        case UPDATE_STATION:
            console.log('from reduce', state)
            console.log('from reduce what i got ', action.station)
            stations = state.stations.map(station => (station._id === action.station._id) ? action.station : station)
            return { ...state, stations }
        default:
            return { ...state }
    }
}

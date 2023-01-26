
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import data from '../data/station-data.json'

const STATION_KEY = 'stationDB'
const stationsData = data

_createStations()

export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation,
    getMusicGeners
}
// window.cs = stationService


async function query(filterBy = getEmptyFilterBy) {
    return storageService.query(STATION_KEY)
    // return httpService.get(STORAGE_KEY, filterBy)
}

function getById(stationId) {
    
    return storageService.get(STATION_KEY, stationId)
    // return httpService.get(`station/${stationId}`)
}

async function remove(stationId) {
    await storageService.remove(STATION_KEY, stationId)
    // return httpService.delete(`station/${stationId}`)
}
async function save(station) {
    var savedStation
    if (station.songs.length > 0) {
        savedStation = await storageService.put(STATION_KEY, station)
        // savedStation = await httpService.put(`station/${station._id}`, station)
    } else {
        // Later, owner is set by the backend
        // station.owner = userService.getLoggedinUser()
        savedStation = await storageService.post(STATION_KEY, station)
        // savedStation = await httpService.post('station', station)
    }
    return savedStation
}

// async function addStationMsg(stationId, txt) {
//     const savedMsg = await httpService.post(`station/${stationId}/msg`, {txt})
//     return savedMsg
// }

function getNewStation(){
    _id: utilService.makeId()
    
}

function getEmptyFilterBy() {
    return {
        searchInput: "",
    }
}

function getEmptyStation() {
    return {
        "_id": utilService.makeId(),
        "name": "My Playlist",
        "imgUrl": "https://www.clipartmax.com/png/middle/69-697655_music-music-note-music-notes-musical-note-notes-music-icon-grey-png.png",
        "tags": [],
        "createdBy": {
          _id: "",
          username: "guest",
          imgUrl: "https://robohash.org/set=set3",
          fullname: "Guest"
        },
        "likedByUsers": [],
        "songs": [],
        "msgs": [],
    }
}

function _createStations() {
    let stations = utilService.loadFromStorage(STATION_KEY)
    if (!stations || !stations.length) {
        stations = stationsData
        utilService.saveToStorage(STATION_KEY, stations)
    }
    // return stations
}

function getMusicGeners(){
    return ([
        {name: "Podcasts", bgc: `#e13300`, imgUrl: "https://i.scdn.co/image/567158eb895ad26718a814345af0fc43ee785ec5"},
        {name: "Made for you", bgc: `#1e3264`, imgUrl: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe"},
        {name: "New releases", bgc: `#e8115b`, imgUrl:"https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112"},
        {name: "Pop", bgc: `#148a08`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafa862ab80dd85682b37c4e768"},
        {name: "Hip-Hop", bgc: `#bc5900`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf7e11c8413dc33c00740579c1"},
        {name: "Rock", bgc: `#e91429`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafae7e69beb88f16969641b53e"},
        {name: "Latin", bgc: `#e1118c`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafa59f90c077c9f618fd0dde30"},
        {name: "Charts", bgc: `#8d67ab`, imgUrl: "https://charts-images.scdn.co/assets/locale_en/regional/weekly/region_global_default.jpg"},
        {name: "Live Events", bgc: `#7358ff`, imgUrl: "https://concerts.spotifycdn.com/images/live-events_category-image.jpg"},
        {name: "Dance/Electronic", bgc: `#d84000`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafdfdaac1cf9574a196ca25196"},
        {name: "Mood", bgc: `#e1118c`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf271f9d895003c5f5561c1354"},
        {name: "Indie", bgc: `#e91429`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafa1a252e3a815b65778d8c2aa"},
        {name: "Workout", bgc: `#777`, imgUrl: "https://i.scdn.co/image/ab67706f000000029249b35f23fb596b6f006a15"},
        {name: "Discover", bgc: `#8d67ab`, imgUrl: "https://t.scdn.co/images/d0fb2ab104dc4846bdc56d72b0b0d785.jpeg"},
        {name: "Country", bgc: `#d84000`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafc0d2222b4c6441930e1a386e"},
        {name: "R&B", bgc: `#dc148c`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafbe6a6e705e1a71117c2d0c2c"},
        {name: "K-pop", bgc: `#148a08`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf013ee3c983e6f60bf28bad5a"},
        {name: "Chill", bgc: `#d84000`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf47e942f5bea637f4f4760170"},
        {name: "Sleep", bgc: `#1e3264`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf47e942f5bea637f4f4760170"},
        {name: "Party", bgc: `#537aa1`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafcbf80f8ea695536eace4fd2c"},
        {name: "At Home", bgc: `#5179a1`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafe914a07d20cec7a65e2e5dad"},
        {name: "Decades", bgc: `#ba5d07`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caff005a355830c374754d32868"},
        {name: "Romance", bgc: `#8c1932`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf31524ba1bc89837d86db3a5f"},
        {name: "Metal", bgc: `#e91429`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafefa737b67ec51ec989f5a51d"},
        {name: "Jazz", bgc: `#777`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafe289743024639ea8f202364d"},
        {name: "Trending", bgc: `#b02897`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf1867113f5218598847550acd"},
        {name: "Wellness", bgc: `#a56752`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf8dec632effd9735fa8aba06e"},
        {name: "Anime", bgc: `#e41d63`, imgUrl: "	https://i.scdn.co/image/ab67706f00000002c19c5f13f8b3ff2d73ff00bc"},
        {name: "Gaming", bgc: `#e8115b`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf26dd3719e8824756914ae61f"},
        {name: "Folk & Family", bgc: `#bc5900`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafcc70a3c2e4c71398708bdc4a"},
        {name: "Focus", bgc: `#503750`, imgUrl: "https://i.scdn.co/image/ab67706f00000002e4eadd417a05b2546e866934"},
        {name: "Soul", bgc: `#dc148c`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafd82e2c83fe100a89e9cbb2a2"},
        {name: "Kids & Family", bgc: `#8d67ab`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf8a04560a209b3f32165ea8a2"},
        {name: "Classical", bgc: `#7d4b32`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf12809992dfc5b318892ea07b"},
        {name: "TV & Movies", bgc: `#af2896`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafb4c4523336133ec3c7fd1744"},
        {name: "Instrumental", bgc: `#537aa1`, imgUrl: "https://i.scdn.co/image/ab67706f000000028ed1a5002b96c2ea882541b2"},
        {name: "Punk", bgc: `#1e3264`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafb2cdd7a95b0a5444aa15cfb5"},
        {name: "Ambient", bgc: `#477d95`, imgUrl: "	https://i.scdn.co/image/ab67fb8200005cafa6ee95dc83af715115f40522"},
        {name: "Netflix", bgc: `#eb1e32`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf0b0c71c920d6a745461ada69"},
        {name: "Blues", bgc: `#b06239`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caff22ac5cab318d550b593ffac"},
        {name: "Cooking & Dining", bgc: `#ba5d07`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafe53d71d0920a4f1f441d803c"},
        {name: "Alternative", bgc: `#e91429`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafda178a834e4f87371e9fa543"},
        {name: "Travel", bgc: `#0d72ed`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf4b36a2c31432ace68d90c4f2"},
        {name: "Caribbean", bgc: `#0d73ec`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf8ba1febbb4f77336b6f9aace"},
        {name: "Afro", bgc: `#d84000`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf04faccb4f5e1828600921f37"},
        {name: "Songwrites", bgc: `#8c1932`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafb973ab1288f74f333e7e2e22"},
        {name: "Funk & Disco", bgc: `#e61e32`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafbb0e4ea229824157eee7467d"},
        {name: "League Of Leagends", bgc: `#148a08`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf2b1ff59a971dd399dea96009"},
        {name: "Spotify Singles", bgc: `#777`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf14030380532b34badbf0a229"},
        {name: "Summer", bgc: `#438270`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf097a46192e6bb67e52cdff60"},
        {name: "EQUAL", bgc: `#056952`, imgUrl: "https://i.scdn.co/image/ab67fb8200005caf9ed6e364e8839210dc4dbff7"},
        {name: "RADAR", bgc: `#777`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafdb2aa9c7caea42f900721497"},
        {name: "Fresh Finds", bgc: `#ff0090`, imgUrl: "https://i.scdn.co/image/ab67fb8200005cafcc1499bbb8565f490858c2bc"},
])  
}



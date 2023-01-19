// List of user stations

// import { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { loadStations,} from '../store/station.actions.js'

// import { stationService } from '../services/station.service.js'
// import { stationService } from '../services/station.service.local.js'
// import { youtubeService } from '../services/youtube.service.js'


//with grid
//playlist (station) card
// export function Library() {
//     const stations = useSelector(storeState => storeState.stationModule.stations)

//     // const dataY = youtubeService.getServerSideProps().then(result => result.PromiseResult)
//     // const data = youtubeService.getServerSideProps()
//     // console.log(data)

//     const itemList = []
//     youtubeService.getServerSideProps().then(res => {
//         res.data.items.map((item) => {
//             itemList.push(item)
//         })
//         return res
//     })

//     useEffect(() => {
//         loadStations()
//     }, [])

    // async function onRemoveStation(stationId) {
    //     try {
    //         await removeStation(stationId)
    //         showSuccessMsg('Station removed')
    //     } catch (err) {
    //         showErrorMsg('Cannot remove station')
    //     }
    // }

    // async function onAddStation() {
    //     const station = stationService.getEmptyStation()
    //     station.vendor = prompt('Vendor?')
    //     try {
    //         const savedStation = await addStation(station)
    //         showSuccessMsg(`Station added (id: ${savedStation._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add station')
    //     }
    // }

    // async function onUpdateStation(station) {
    //     const price = +prompt('New price?')
    //     const stationToSave = { ...station, price }
    //     try {
    //         const savedStation = await updateStation(stationToSave)
    //         showSuccessMsg(`Station updated, new price: ${savedStation.price}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot update station')
    //     }
    // }

    // function onAddStationMsg(station) {
    //     console.log(`TODO Adding msg to station`)
    // }

//     return (
//         <div>
//             <h3>Stations App</h3>
//             <h3>Music </h3>
//             {console.log('lib', itemList)}
//                        {/* {itemList}.map((item) => {console.log(item.id)}) */}

//             <iframe id="player" type="text/html" width="640" height="390"
//                 src="http://www.youtube.com/embed/BPNTC7uZYrI"
//                 frameBorder="0"></iframe>

//         </div>
//     )
// }

// List of user stations

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { addStation, updateStation, removeStation } from '../store/station.actions.js'
// loadStations
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stationService } from '../services/station.service.js'
// import { stationService } from '../services/station.service.local.js'
import { youtubeService } from '../services/youtube.service.js'


//with grid
//playlist (station) card
export function Library() {
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const [itemList2, setListItem] = useState([])
    // console.log('right from service', listItem)
    // const itemList2 = []



    useEffect(() => {
        youtubeService.getServerSideProps().then(res => {
            const songs = res.data.items
            setListItem(songs)
        })
    }, [])

    // async function onRemoveStation(stationId) {
    //     try {
    //         await removeStation(stationId)
    //         showSuccessMsg('Station removed')
    //     } catch (err) {
    //         showErrorMsg('Cannot remove station')
    //     }
    // }

    // async function onAddStation() {
    //     const station = stationService.getEmptyStation()
    //     station.vendor = prompt('Vendor?')
    //     try {
    //         const savedStation = await addStation(station)
    //         showSuccessMsg(`Station added (id: ${savedStation._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add station')
    //     }
    // }

    // async function onUpdateStation(station) {
    //     const price = +prompt('New price?')
    //     const stationToSave = { ...station, price }
    //     try {
    //         const savedStation = await updateStation(stationToSave)
    //         showSuccessMsg(`Station updated, new price: ${savedStation.price}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot update station')
    //     }
    // }

    // function onAddStationMsg(station) {
    //     console.log(`TODO Adding msg to station`)
    // }

    // if (!itemList2 || !itemList2.length) {
    //     console.log('in')
    //     return <h1>loading...</h1>
    // }

    return (
        <div>
            <h3>Stations App</h3>
            <h3>Music </h3>

            {itemList2.map((item) => {
                return <iframe key={item.id} id="player" type="text/html" width="640" height="390"
                    src={`http://www.youtube.com/embed/${item.id}`}
                    frameBorder="0"></iframe>
            })}



        </div>
    )
}


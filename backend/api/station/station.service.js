const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = { txt: '' }) {
    try {
        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('stations')
        var stations = await collection.find().toArray()
        // stations = stations.map(station =>{
        //     station.createdAt = ObjectId(station._id).getTimestamp()
        //     return station
        // })
        return stations
    } catch (err) {
        logger.error('cannot find stations', err)
        throw err
    }
}

async function getById(stationId) {
    try {
        const collection = await dbService.getCollection('stations')
        const station = collection.findOne({ _id: ObjectId(stationId) })
        return station
    } catch (err) {
        logger.error(`while finding station ${stationId}`, err)
        throw err
    }
}

async function remove(stationId) {
    try {
        const collection = await dbService.getCollection('stations')
        await collection.deleteOne({ _id: ObjectId(stationId) })
        return stationId
    } catch (err) {
        logger.error(`cannot remove station ${stationId}`, err)
        throw err
    }
}

async function add(station) {
    try {
        const collection = await dbService.getCollection('stations')
        await collection.insertOne(station)
        return station
    } catch (err) {
        logger.error('cannot insert station', err)
        throw err
    }
}

async function update(station) {
    try {
        const stationToSave = {
            _id: ObjectId(station._id),
            name: station.name,
            tags: station.tags,
            imgUrl: station.imgUrl,
            likedSongs: station.likedSongs //may be in diffrent key name, need to check the data
            // description: station.description     need to check the data
        }
        // const stationToSave = {
        //     vendor: station.vendor,
        //     price: station.price
        // }
        const collection = await dbService.getCollection('stations')
        await collection.updateOne({ _id: stationToSave._id }, { $set: stationToSave })
        // await collection.updateOne({ _id: ObjectId(station._id) }, { $set: stationToSave })
        return station
    } catch (err) {
        logger.error(`cannot update station ${station._id}`, err)
        throw err
    }
}

// async function addStationMsg(stationId, msg) {
//     try {
//         msg.id = utilService.makeId()
//         const collection = await dbService.getCollection('stations')
//         await collection.updateOne({ _id: ObjectId(stationId) }, { $push: { msgs: msg } })
//         return msg
//     } catch (err) {
//         logger.error(`cannot add station msg ${stationId}`, err)
//         throw err
//     }
// }

// async function removeStationMsg(stationId, msgId) {
//     try {
//         const collection = await dbService.getCollection('stations')
//         await collection.updateOne({ _id: ObjectId(stationId) }, { $pull: { msgs: { id: msgId } } })
//         return msgId
//     } catch (err) {
//         logger.error(`cannot add station msg ${stationId}`, err)
//         throw err
//     }
// }


function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options:'i' }
        criteria.$or=[{name: txtCriteria},{gener:txtCriteria}]
    }
    return criteria
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    // addStationMsg,
    // removeStationMsg
}

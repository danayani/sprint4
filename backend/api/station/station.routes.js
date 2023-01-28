const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getStations, getStationById, addStation, updateStation, removeStation, addStationMsg, removeStationMsg } = require('./station.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getStations)
router.get('/:id', getStationById)
router.post('/', requireAuth, addStation)
router.put('/:id', requireAuth, updateStation)
router.delete('/:id', requireAuth, removeStation)
// router.delete('/:id', requireAuth, requireAdmin, removeStation)

router.post('/:id/msg', requireAuth, addStationMsg)
router.delete('/:id/msg/:msgId', requireAuth, removeStationMsg)

module.exports = router
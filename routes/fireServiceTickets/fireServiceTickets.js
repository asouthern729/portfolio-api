const express = require('express')
const { getTickets, getTicket, getUnits, getLocations, getOpenTickets, getNewTickets } = require('../../controllers/fireServiceTickets/fireServiceTickets')

const router = express.Router()

router
  .route('/tickets')
  .get(getTickets)

router
  .route('/ticket/:id')
  .get(getTicket)

router
  .route('/units')
  .get(getUnits)

router
  .route('/locations')
  .get(getLocations)

router
  .route('/ffd/tickets/opentickets')
  .get(getOpenTickets)

router
  .route('/ffd/tickets/newtickets')
  .get(getNewTickets)

module.exports = router
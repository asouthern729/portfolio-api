const express = require('express')
const { getTicketMemos, getMemo } = require('../../controllers/fireServiceTickets/memos')

const router = express.Router()

router
  .route('/ticket/:ticketid')
  .get(getTicketMemos)

router
  .route('/memo/:id')
  .get(getMemo)

module.exports = router
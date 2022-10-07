const { Op } = require('sequelize')
const asyncHandler = require('../../middleware/async')
const { FireServiceTickets } = require('../../models')

// @desc    Import rows into planetscale from server
// @route   GET /api/v1/portfolio/ffd-tickets/tickets
// @access  Public
exports.getTickets = asyncHandler(async (req, res, next) => {
  const response = await FireServiceTickets.findAll()

  res.status(200).json({
    success: true,
    data: response
  })
})

// @desc    Get ticket
// @route   GET /api/v1/portfolio/ffd-tickets/ticket/:id
// @access  Public
exports.getTicket = asyncHandler(async (req, res, next) => {
  const ticket = await FireServiceTickets.findOne({
    where: {
      id: req.params.id
    }
  })

  if(!ticket) {
    return next(new ErrorResponse(`No ticket found with ID#${req.params.id}`, 404))
  }

  res.status(200).json({
    success: true,
    data: ticket
  })
})

// @desc    Get units by location
// @route   GET /api/v1/portfolio/ffd-tickets/units
// @access  Public
exports.getUnits = asyncHandler(async (req, res, next) => {
  const location = req.query.location

  const showClosed = req.query.showClosed

  if(showClosed) {
    const units = await FireServiceTickets.findAll({
      where: {
        homeLocation: location,
      },
      attributes: ['unit', 'isApparatus', 'homeLocation'],
      group: ['unit', 'isApparatus', 'homeLocation'],
      order: [['isApparatus', 'asc']]
    })

    res.status(200).json({
      success: true,
      data: units
    })
  } else {
    const units = await FireServiceTickets.findAll({
      where: {
        homeLocation: location,
        timeClosed: null
      },
      attributes: ['unit', 'isApparatus', 'homeLocation'],
      group: ['unit', 'isApparatus', 'homeLocation'],
      order: [['isApparatus', 'asc']]
    })

    res.status(200).json({
      success: true,
      data: units
    })
  }
})

// @desc    Get locations
// @route   GET /api/v1/portfolio/ffd-tickets/locations
// @access  Public
exports.getLocations = asyncHandler(async (req, res, next) => {
  const locations = await FireServiceTickets.findAll({
    attributes: ['homeLocation'],
    group: ['homeLocation']
  })
  
  res.status(200).json({
    success: true,
    data: locations
  })
})

// @desc    Get open tickets counts for apparatus, facilities, locations, and all FFD
// @route   GET /api/v1/portfolio/ffd-tickets/ffd/tickets/newtickets
// @access  Public
exports.getOpenTickets = asyncHandler(async (req, res, next) => {
  let openTickets = {
    allFFD: {
      count: null
    },
    locations: [],
    apparatus: [],
    facilities: []
  }

  const openTicketsByLocation = await FireServiceTickets.findAndCountAll({
    where: {
      timeClosed: null
    },
    attributes: ['homeLocation'],
    group: [['homeLocation']]
  })

  openTickets.locations = openTicketsByLocation.count

  const openAllFFDTickets = await FireServiceTickets.findAndCountAll({
    where: {
      timeClosed: null
    }
  })

  openTickets.allFFD.count = openAllFFDTickets.count

  const openApparatusTickets = await FireServiceTickets.findAndCountAll({
    where: {
      timeClosed: null,
      isApparatus: 1
    },
    attributes: ['unit'],
    group: [['unit']]
  })

  openTickets.apparatus = openApparatusTickets.count

  const openFacilitiesTickets = await FireServiceTickets.findAndCountAll({
    where: {
      timeClosed: null,
      isApparatus: 0
    },
    attributes: ['unit'],
    group: [['unit']]
  })

  openTickets.facilities = openFacilitiesTickets.count

  res.status(200).json({
    success: true,
    data: openTickets
  })
})

// @desc    Get new tickets counts for apparatus, facilities, locations, and all FFD
// @route   GET /api/v1/servicepro/ffd/tickets/ffd/tickets/newtickets
// @access  Public
exports.getNewTickets = asyncHandler(async (req, res, next) => {
  let currentDateTime = new Date()
  currentDateTime = currentDateTime.setDate(currentDateTime.getDate() - 2)
  currentDateTime = new Date(currentDateTime)

  let newTickets = {
    allFFD: {
      count: {}
    },
    locations: [],
    apparatus: [],
    facilities: []
  }

  const newAllFFDTickets = await FireServiceTickets.findAndCountAll({
    where: {
      timeLogged: {
        [Op.gte]: currentDateTime
      },
      timeClosed: null
    }
  })

  newTickets.allFFD.count = newAllFFDTickets.count

  const newLocationsTickets = await FireServiceTickets.findAndCountAll({
    where: {
      timeLogged: {
        [Op.gte]: currentDateTime
      },
      timeClosed: null
    },
    attributes: ['homeLocation'],
    group: [['homeLocation']]
  })

  newTickets.locations = newLocationsTickets.count

  const newApparatusTickets = await FireServiceTickets.findAndCountAll({
    where: {
      timeLogged: {
        [Op.gte]: currentDateTime
      },
      isApparatus: 1,
      timeClosed: null
    },
    attributes: ['unit'],
    group: [['unit']]
  })

  newTickets.apparatus = newApparatusTickets.count

  const newFacilitiesTickets = await FireServiceTickets.findAndCountAll({
    where: {
      timeLogged: {
        [Op.gte]: currentDateTime
      },
      isApparatus: 0,
      timeClosed: null
    },
    attributes: ['unit'],
    group: [['unit']]
  })

  newTickets.facilities = newFacilitiesTickets.count
  
  res.status(200).json({
    success: true,
    data: newTickets
  })
})
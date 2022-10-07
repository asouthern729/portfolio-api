const { Memos } = require('../../models')
const ErrorResponse = require('../../middleware/errorResponse')
const asyncHandler = require('../../middleware/async')

// @desc    Get all memos for specific ticket
// @route   GET /api/v1/portfolio/ffd-memos/memo/:ticketid
// @access  Public
exports.getTicketMemos = asyncHandler(async (req, res, next) => {
  const memos = await Memos.findAll({
    where: {
      requestId: req.params.ticketid
    },
    order: [['memoDateTime','desc']]
  })

  if(!memos) {
    return next(new ErrorResponse(`No memos found for ticket #${req.params.ticketid}`))
  }

  res.status(200).json({
    success: true,
    data: memos
  })
})

// @desc    Get memo by id
// @route   GET /api/v1/portfolio/ffd-tickets/memo/:id
// @access  Public
exports.getMemo = asyncHandler(async (req, res, next) => {
  const memo = await Memos.findOne({
    where: {
      id: req.params.id
    }
  })

  if(!memo) {
    return next(new ErrorResponse(`No memo found with ID#${req.params.id}`), 404)
  }

  res.status(200).json({
    success: true,
    data: memo
  })
})
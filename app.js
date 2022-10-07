const express = require('express')
const dotenv = require('dotenv')
const errorHandler = require('./middleware/errorHandler')

dotenv.config({ path: 'config/config.env' })

const app = express()

// Request body parser
app.use(express.json())

// Route files
const tickets = require('./routes/fireServiceTickets/fireServiceTickets')
const memos = require('./routes/fireServiceTickets/memos')

// Mount routers
app.use('/api/v1/portfolio/fire-tickets', tickets)
app.use('/api/v1/portfolio/fire-memos', memos)

// Error handler
app.use(errorHandler)

const port = process.env.port

app.listen({ port }, async () => {
  console.log(`Server up on port ${port}.. ${process.env.NODE_ENV} mode`)
})
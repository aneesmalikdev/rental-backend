import cors from 'cors'
import dotenv from 'dotenv'
import errorhandler from 'errorhandler'
import express from 'express'
import mongoose from 'mongoose'
import routes from './modules/index.js'
import Logger from './utils/logger.js'
import { firebase } from './connections/firebase.js'

dotenv.config()

const app = express()
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => Logger.success('Connected to MongoDB'))
  .catch((err) => Logger.error(`Failed to connect to MongoDB ${JSON.stringify(err)}`))

app.use(cors())
app.use(express.json())

app.use(express.static('../public'))

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler())
}

app.use('/api', routes)

app.get('/', (req, res) => {
  res.send('Get Ready')
})

app.listen(process.env.PORT, () => {
  Logger.success(`App listening on port ${process.env.PORT}`)
})

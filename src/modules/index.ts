import { Router } from 'express'
import userRoutes from './user/routes.js'
import billRoutes from './bill/routes.js'

const router = Router()
router.get('/', (req, res) => {
  res.send('Hello from the root of the API!')
})
router.use('/users', userRoutes)
router.use('/bills', billRoutes)

export default router

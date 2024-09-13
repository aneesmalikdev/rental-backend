import { Router } from 'express'

import guard from '../../auth/firebase-auth-guard.js'
import { execute } from '../../middlewares/common-controler.js'
import { createBill } from './handlers.js'

const router = Router()

router.post('/', guard(), execute(createBill))
// router.get('/', guard(), execute())

export default router

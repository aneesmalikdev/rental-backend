import { Router } from 'express'
import guard from '../../auth/firebase-auth-guard.js'
import { execute } from '../../middlewares/common-controler.js'
import { createUser, getUserDetails, getUsers, updateUser } from './handlers.js'
import { UserRole } from '../../types/user-types.js'
const router = Router()

router.post('/', guard(), execute(createUser))
router.put('/', guard(), execute(updateUser))
router.get('/me', guard(), execute(getUserDetails))
router.get('/', guard(), execute(getUsers))

export default router

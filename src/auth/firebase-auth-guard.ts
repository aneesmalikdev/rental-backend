import { NextFunction, Request, Response } from 'express'
import errors from 'http-errors'
import { firebase } from '../connections/firebase.js'
import Logger from '../utils/logger.js'
import { UserModel } from '../models/user-model.js'
import { UserRole } from '../types/user-types.js'
import { RequestAuth } from '../types/common-types.js'

//

const headerKey = 'authorization'

function guard(...roles: readonly string[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers[headerKey]

    if (authToken == undefined) {
      return res.send(new errors.Unauthorized('Authorization token missing'))
    }

    let decodedToken
    try {
      decodedToken = await firebase.auth.verifyIdToken(authToken)
    } catch (error) {
      Logger.error(`Auth token verification failed: ${JSON.stringify(error)}`)
      return res.send(new errors.Unauthorized('Auth token verification failed'))
    }
    const [fireUser, user] = await Promise.all([
      firebase.auth.getUser(decodedToken.uid),
      UserModel.exists({ firebaseId: decodedToken.uid }),
    ])
    if (fireUser.disabled) {
      throw new errors.BadRequest('Your account is disabled. Please contact support to activate your account')
    }
    const artifacts: RequestAuth = {
      firebaseId: decodedToken.uid,
      userId: user?._id as string | undefined,
      isAdmin: decodedToken.isAdmin ?? false,
      isResident: decodedToken.isResident ?? false,
      isSupport: decodedToken.isSupport ?? false,
    }

    if (roles != undefined && roles.length > 0) {
      const adminAllowed = decodedToken.isAdmin && roles.includes(UserRole.ADMIN)
      const residentAllowed = decodedToken.isGuardian && roles.includes(UserRole.RESIDENT)
      const supportAllowed = decodedToken.isOrganizer && roles.includes(UserRole.RESIDENT)

      if (!(adminAllowed || residentAllowed || supportAllowed)) {
        return res.send(new errors.Forbidden('You are not allowed to perform this action'))
      }
    }

    ;(req as any).artifacts = artifacts
    next()
  }
}

export default guard

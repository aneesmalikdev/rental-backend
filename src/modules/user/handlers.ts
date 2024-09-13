import { firebase } from '../../connections/firebase.js'
import { UserModel } from '../../models/user-model.js'
import { RequestAuth } from '../../types/common-types.js'

export async function createUser(ctx: RequestAuth, payload: any) {
  const [user] = await Promise.all([
    UserModel.create({ ...payload, firebaseId: ctx.firebaseId }),
    firebase.auth.setCustomUserClaims(ctx.firebaseId!, { isResident: true }),
  ])
  return user
}
export async function updateUser(ctx: RequestAuth, payload: any) {
  const userId = ctx.userId
  if (!userId) return { user: null }
  const user = await UserModel.findByIdAndUpdate(userId, payload, { new: true })
  return { user }
}
export async function getUserDetails(ctx: RequestAuth, payload: any) {
  const userId = ctx.userId

  if (!userId) return { user: null }

  const user = await UserModel.findById(userId)
  return { user }
}
export async function getUsers(ctx: RequestAuth, payload: any) {
  const users = await UserModel.find()
  return { users }
}

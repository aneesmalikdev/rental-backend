import { Document } from 'mongoose'

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}
export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
}
export interface IUser extends Document {
  firebaseId: string
  fullName: string
  gender: 'male' | 'female'
  email: string
  phoneNumber: string
  role: UserRole
  status: UserStatus
  dob: Date
  profile: string
}

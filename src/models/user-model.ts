import { model, Schema } from 'mongoose'
import { UserRole, UserStatus, UserType } from '../types/user-types.js'
import { ColNames } from './col-names.js'

const userSchema = new Schema<UserType>(
  {
    firebaseId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'] },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    role: { type: String, enum: UserRole, default: UserRole.RESIDENT },
    status: { type: String, enum: UserStatus, default: UserStatus.ACTIVE },
    dob: { type: Date, required: true },
    profile: { type: String },
    houseNo: { type: Number },
    streetNo: { type: String },
  },
  {
    timestamps: true,
    id: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

export const UserModel = model(ColNames.User, userSchema)

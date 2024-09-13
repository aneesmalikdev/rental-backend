import { ObjectId, Document } from 'mongoose'

export enum BusinessStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
}

export interface IBusiness extends Document {
  ownerId: ObjectId
  profilePicUrl: string
  bannerUrl: string
  businessName: string
  email: string
  phone: string
  status: BusinessStatus
  description: string
  location: {
    type: 'Point'
    coordinates: [number, number]
  }
}

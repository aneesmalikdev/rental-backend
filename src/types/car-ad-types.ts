import { Document, ObjectId } from 'mongoose'

export interface ICarBrand extends Document {
  businessId: ObjectId
  pictureId: ObjectId
}

export interface ICarAd extends Document {
  businessId: ObjectId
  pictureUrls: string[]
  pricePerDay: number
  transmission: 'manual' | 'auto'
  fuelType: 'petrol' | 'diesel'
  color: string
  brandId: ObjectId
  model: string
  modelYear: number
  title: string
  description: string
  location: {
    type: 'Point'
    coordinates: [number, number]
  }
  variant: string
  type: 'SUV' | 'Sedan' | 'Hatchback' | '4X4' | string
  isFeatured: boolean
}

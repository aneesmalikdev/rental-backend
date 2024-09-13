import { Document } from 'mongoose'

export interface ICarBrand extends Document {
  title: string
  logoUrl: string
  popularity: number
  lastUpdated: Date
}

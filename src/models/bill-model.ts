import { model, Schema } from 'mongoose'
import { BillStatus, IBill } from '../types/bill-types.js'
import { ColNames } from './col-names.js'

const billSchema = new Schema<IBill>(
  {
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    status: { type: String, default: BillStatus.Open },
    paidAt: { type: Date },
    paymentId: { type: Schema.Types.ObjectId, ref: ColNames.Payment },
    dueDate: { type: Date, required: true },
    residentId: { type: Schema.Types.ObjectId, ref: ColNames.User, required: true },
  },
  {
    timestamps: true,
    id: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

export const BillModel = model(ColNames.Bill, billSchema)

import { BillModel } from '../../models/bill-model.js'
import { RequestAuth } from '../../types/common-types.js'

export async function createBill(ctx: RequestAuth, payload: any) {
  const bill = await BillModel.create(payload)
  return bill
}

export async function getAllBills(ctx: RequestAuth, payload: any) {
  const bills = await BillModel.find({})
  return bills
}

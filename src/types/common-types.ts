import { Request } from 'express'

export interface RequestAuth {
  readonly firebaseId?: string
  readonly isAdmin?: boolean
  readonly isResident?: boolean
  readonly isSupport?: boolean
  readonly userId?: string
}

export type RequestHandler<P, R> = (context: RequestAuth, payload: P) => R | Promise<R>

export type RawRequestHandler<R> = (context: RequestAuth, request: Request) => R | Promise<R>

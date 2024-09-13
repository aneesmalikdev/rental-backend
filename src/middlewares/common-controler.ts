import { Request, Response } from 'express'
import { RequestAuth, RequestHandler } from '../types/common-types.js'
import errors from 'http-errors'
import Logger from '../utils/logger.js'
export function execute<P, R>(action: RequestHandler<P, R>) {
  async function handle(request: Request, reply: Response) {
    const requestAuth: RequestAuth = (request as any).artifacts
    const context: RequestAuth = requestAuth

    const payload: any = Object.assign({}, request.query, request.params, request.body)

    try {
      const resp = await action(context, payload)
      return reply.send(resp)
    } catch (error: any) {
      if (errors.isHttpError(error)) {
        return reply.send(error)
      } else {
        Logger.error(`Request failed with error: ${JSON.stringify(error)}`)
        return reply.send(new errors.InternalServerError(error))
      }
    }
  }

  return handle
}

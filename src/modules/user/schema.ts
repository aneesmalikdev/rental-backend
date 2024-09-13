import { z } from 'zod'

const createUserBodySchema = z.object({
  firtName: z.string(),
})

const createUserParamSchema = z.object({
  id: z.string(),
})

export type CreateUserDto = z.infer<typeof createUserBodySchema> & z.infer<typeof createUserParamSchema>

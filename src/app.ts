import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/pets', async (request, reply) => {
  const registerPetBodySchema = z.object({
    name: z.string(),
    age: z.coerce.number(),
    breed: z.string(),
    city: z.string(),
  })

  const { name, age, breed, city } = registerPetBodySchema.parse(request.body)

  await prisma.pet.create({ data: { name, age, breed, city } })

  return reply.status(201).send()
})

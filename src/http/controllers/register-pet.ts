import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    age: z.coerce.number(),
    breed: z.string(),
    city: z.string(),
  })

  const { name, age, breed, city } = registerBodySchema.parse(request.body)

  await prisma.pet.create({
    data: {
      name,
      age,
      breed,
      city,
    },
  })

  return reply.status(201).send()
}

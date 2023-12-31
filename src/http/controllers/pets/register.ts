import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '@/use-cases/register-pet'
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

  const repository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgRepository()
  const useCase = new RegisterPetUseCase(repository, orgsRepository)

  await useCase.execute({
    name,
    age,
    breed,
    city,
    orgId: request.user.sub,
  })

  return reply.status(201).send()
}

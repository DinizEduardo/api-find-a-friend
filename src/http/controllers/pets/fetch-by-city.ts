import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByCityUseCase } from '@/use-cases/fetch-pets-by-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPetsByCityQuerySchema = z.object({
    city: z.string(),
  })

  const { city } = fetchPetsByCityQuerySchema.parse(request.query)

  const repository = new PrismaPetsRepository()
  const useCase = new FetchPetsByCityUseCase(repository)

  const { pets } = await useCase.execute({ city })

  return reply.status(200).send({ pets })
}

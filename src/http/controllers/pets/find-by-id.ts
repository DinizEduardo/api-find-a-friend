import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetByIdUseCase } from '@/use-cases/get-pet-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findPetById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findPetByIdParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = findPetByIdParamsSchema.parse(request.params)

  const repository = new PrismaPetsRepository()
  const useCase = new GetPetByIdUseCase(repository)

  const { pet } = await useCase.execute({ id: petId })

  return reply.status(201).send({ pet })
}

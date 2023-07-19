import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { RegisterOrgUseCase } from '@/use-cases/org/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrg(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrgSchema = z.object({
    name: z.string(),
    address: z.string(),
    whatsapp: z.string().min(11).max(11),
    password: z.string().min(6),
  })

  const { name, address, whatsapp, password } = registerOrgSchema.parse(
    request.body,
  )

  const orgsRepository = new PrismaOrgRepository()
  const authenticateUseCase = new RegisterOrgUseCase(orgsRepository)

  await authenticateUseCase.execute({
    name,
    address,
    whatsapp,
    password,
  })

  return reply.status(201).send()
}

import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { AuthenticateOrgUseCase } from '@/use-cases/org/authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    whatsapp: z.string(),
    password: z.string().min(6),
  })

  const { whatsapp, password } = authenticateBodySchema.parse(request.body)

  try {
    const orgsRepository = new PrismaOrgRepository()
    const authenticateUseCase = new AuthenticateOrgUseCase(orgsRepository)

    const { org } = await authenticateUseCase.execute({ whatsapp, password })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}

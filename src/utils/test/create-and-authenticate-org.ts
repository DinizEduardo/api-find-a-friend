import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.oRG.create({
    data: {
      name: 'John Doe',
      password_hash: await hash('123456', 6),
      whatsapp: '11111111111',
      address: 'Rua xxxx, 3333',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    whatsapp: '11111111111',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}

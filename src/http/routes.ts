import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate'
import { registerPet } from './controllers/register-pet'

export async function appRoutes(app: FastifyInstance) {
  app.post('/pets', registerPet)

  app.post('/sessions', authenticate)
}

import { FastifyInstance } from 'fastify'
import { registerPet } from './controllers/register-pet'

export async function appRoutes(app: FastifyInstance) {
  app.post('/pets', registerPet)
}

import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/orgs/authenticate'
import { registerOrg } from './controllers/orgs/register'
import { findPetById } from './controllers/pets/find-by-id'
import { registerPet } from './controllers/pets/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrg)

  app.post('/pets', registerPet)

  app.get('/pets/:petId', findPetById)

  app.post('/sessions', authenticate)
}

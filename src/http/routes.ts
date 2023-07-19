import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/orgs/authenticate'
import { registerOrg } from './controllers/orgs/register'
import { fetchPetsByCity } from './controllers/pets/fetch-by-city'
import { findPetById } from './controllers/pets/find-by-id'
import { registerPet } from './controllers/pets/register'
import { verifyJWT } from './middlewares/verify-JWT'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrg)

  app.post('/pets', { onRequest: [verifyJWT] }, registerPet)

  app.get('/pets/:petId', findPetById)

  app.get('/pets', fetchPetsByCity)

  app.post('/sessions', authenticate)
}

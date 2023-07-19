import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Find pet by id (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to find pet by their id', async () => {
    await createAndAuthenticateOrg(app)

    const { id } = await prisma.oRG.findFirstOrThrow()

    const pet = await prisma.pet.create({
      data: {
        name: 'Pet Name',
        age: 2,
        breed: 'Pet breed',
        city: 'Pet city',
        org_id: id,
      },
    })

    const response = await request(app.server).get(`/pets/${pet.id}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Pet Name',
      }),
    )
  })
})

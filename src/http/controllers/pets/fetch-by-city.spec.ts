import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Fetch pets by city (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to fetch pets within that city', async () => {
    await createAndAuthenticateOrg(app)

    const { id } = await prisma.oRG.findFirstOrThrow()

    await prisma.pet.create({
      data: {
        name: 'Pet Name',
        age: 2,
        breed: 'Pet breed',
        city: 'Pet city',
        org_id: id,
      },
    })

    await prisma.pet.create({
      data: {
        name: 'Pet Name 2',
        age: 5,
        breed: 'Pet breed',
        city: 'Pet city',
        org_id: id,
      },
    })

    const response = await request(app.server).get(`/pets?city=Pet city`)

    expect(response.statusCode).toEqual(200)
  })
})

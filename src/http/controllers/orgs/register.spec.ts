import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register ORG (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register a new org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'ORG Doadores de Animais',
      address: 'Rua xxxx, 1234',
      whatsapp: '11111111111',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})

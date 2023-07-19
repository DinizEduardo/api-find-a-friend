import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate ORG (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to authenticate a org', async () => {
    await request(app.server).post('/orgs').send({
      name: 'ORG Doadores de Animais',
      address: 'Rua xxxx, 1234',
      whatsapp: '11111111111',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      whatsapp: '11111111111',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})

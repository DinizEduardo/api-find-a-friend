import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { AuthenticateOrgUseCase } from './authenticate'

let orgsRepository: InMemoryOrgRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate org use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('Should be able to authenticate with correct credentials', async () => {
    await orgsRepository.create({
      address: 'Rua xxxx, 1111',
      name: 'ORG dos desenvolvedores',
      password_hash: await hash('123456', 6),
      whatsapp: '11999999999',
    })

    const { org } = await sut.execute({
      password: '123456',
      whatsapp: '11999999999',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with invalid whatsapp', async () => {
    await orgsRepository.create({
      address: 'Rua xxxx, 1111',
      name: 'ORG dos desenvolvedores',
      password_hash: await hash('123456', 6),
      whatsapp: '11999999999',
    })

    await expect(
      async () =>
        await sut.execute({
          password: '123456',
          whatsapp: '11888888888',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with invalid password', async () => {
    await orgsRepository.create({
      address: 'Rua xxxx, 1111',
      name: 'ORG dos desenvolvedores',
      password_hash: await hash('123456', 6),
      whatsapp: '11999999999',
    })

    await expect(
      async () =>
        await sut.execute({
          password: '123123',
          whatsapp: '11999999999',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'
import { RegisterOrgUseCase } from './register'

let orgsRepository: InMemoryOrgRepository
let sut: RegisterOrgUseCase

describe('Register ORG use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('Should hash orgs password upon registration', async () => {
    const { org } = await sut.execute({
      address: 'Rua xxxx, 1111',
      name: 'ORG dos desenvolvedores',
      password: '123456',
      whatsapp: '11999999999',
    })

    const isPasswordHashed = await compare('123456', org.password_hash)

    expect(isPasswordHashed).toBe(true)
  })

  it('Should not be able to register with same whatsapp twice', async () => {
    const whatsapp = '11999999999'

    await sut.execute({
      address: 'Rua xxxx, 1111',
      name: 'ORG dos desenvolvedores',
      password: '123456',
      whatsapp,
    })

    await expect(() =>
      sut.execute({
        address: 'Rua xxxx, 2222',
        name: 'ORG de desenvolvedores',
        password: '123456',
        whatsapp,
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('Should generate an id when creating a new org', async () => {
    const { org } = await sut.execute({
      address: 'Rua xxxx, 1111',
      name: 'ORG dos desenvolvedores',
      password: '123456',
      whatsapp: '11999999999',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})

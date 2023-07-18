import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetUseCase } from './register-pet'

let petsRepository: InMemoryPetRepository
let orgsRepository: InMemoryOrgRepository
let sut: RegisterPetUseCase

describe('Register pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository()
    orgsRepository = new InMemoryOrgRepository()
    sut = new RegisterPetUseCase(petsRepository, orgsRepository)
  })

  it('Should be able to register a pet with a valid org id', async () => {
    const { id } = await orgsRepository.create({
      address: 'Rua xxxx, 1111',
      name: 'ORG dos desenvolvedores',
      password_hash: await hash('123456', 6),
      whatsapp: '11999999999',
    })

    const { pet } = await sut.execute({
      age: 1,
      breed: 'Breed type',
      city: 'São Paulo',
      name: 'Nome do pet',
      orgId: id,
    })

    expect(pet.org_id).toEqual(id)
  })

  it('Should not be able to register a pet with an invalid org id', async () => {
    await expect(
      async () =>
        await sut.execute({
          age: 1,
          breed: 'Breed type',
          city: 'São Paulo',
          name: 'Nome do pet',
          orgId: randomUUID(),
        }),
    ).rejects.toBeInstanceOf(Error)
  })
})

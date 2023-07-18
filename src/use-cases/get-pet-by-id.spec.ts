import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetByIdUseCase } from './get-pet-by-id'

let petsRepository: InMemoryPetRepository
let sut: GetPetByIdUseCase

describe('Get pet by id use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository()
    sut = new GetPetByIdUseCase(petsRepository)
  })

  it('Should be able to find pet by id', async () => {
    const { id } = await petsRepository.create({
      id: randomUUID(),
      age: 1,
      breed: 'Breed type',
      city: 'Santo Andre',
      name: 'Pet 02',
      org_id: randomUUID(),
    })

    const { pet } = await sut.execute({ id })

    expect(pet.id).toEqual(id)
  })

  it('Should not be able to find pet by an unexistent id', async () => {
    await expect(
      async () => await sut.execute({ id: randomUUID() }),
    ).rejects.toBeInstanceOf(Error)
  })
})

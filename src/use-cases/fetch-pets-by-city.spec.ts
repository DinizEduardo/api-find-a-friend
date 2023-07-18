import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'

let petsRepository: InMemoryPetRepository
let sut: FetchPetsByCityUseCase

describe('Fetch pets by city use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository()
    sut = new FetchPetsByCityUseCase(petsRepository)
  })

  it('Should be able to fetch all pets by city', async () => {
    petsRepository.create({
      id: randomUUID(),
      age: 1,
      breed: 'Breed type',
      city: 'Sao Paulo',
      name: 'Pet 01',
      org_id: randomUUID(),
    })

    petsRepository.create({
      id: randomUUID(),
      age: 1,
      breed: 'Breed type',
      city: 'Santo Andre',
      name: 'Pet 02',
      org_id: randomUUID(),
    })

    const { pets } = await sut.execute({ city: 'Santo Andre' })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Pet 02' })])
  })
})

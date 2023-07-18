import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetRepository implements PetsRepository {
  private items: Pet[] = []

  async fetchPetsByCity(city: string) {
    const pets = this.items.filter((item) => item.city === city)

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      breed: data.breed,
      city: data.city,
      org_id: data.org_id,
      created_at: new Date(),
      adopted_at: null,
    }

    this.items.push(pet)

    return pet
  }
}

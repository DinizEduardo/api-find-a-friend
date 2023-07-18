import { PetsRepository } from '@/repositories/pets-repository'

interface FetchPetsByCityUseCaseRequest {
  city: string
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city }: FetchPetsByCityUseCaseRequest) {
    const pets = await this.petsRepository.fetchPetsByCity(city)

    return { pets }
  }
}

import { PetsRepository } from '@/repositories/pets-repository'

interface RegisterPetUseCaseRequest {
  name: string
  age: number
  breed: string
  city: string
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ name, age, breed, city }: RegisterPetUseCaseRequest) {
    await this.petsRepository.create({
      name,
      age,
      breed,
      city,
    })
  }
}

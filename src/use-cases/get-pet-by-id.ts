import { PetsRepository } from '@/repositories/pets-repository'

interface GetPetByIdUseCaseRequest {
  id: string
}

export class GetPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetByIdUseCaseRequest) {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new Error('Pet não existe')
    }

    return { pet }
  }
}

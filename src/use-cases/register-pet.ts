import { OrgsRepository } from '@/repositories/org-repository'
import { PetsRepository } from '@/repositories/pets-repository'

interface RegisterPetUseCaseRequest {
  name: string
  age: number
  breed: string
  city: string
  orgId: string
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({ name, age, breed, city, orgId }: RegisterPetUseCaseRequest) {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new Error('Não tem a org')
    }

    const pet = await this.petsRepository.create({
      name,
      age,
      breed,
      city,
      org_id: org.id,
    })

    return { pet }
  }
}

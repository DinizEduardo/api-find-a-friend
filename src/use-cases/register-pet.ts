import { PrismaPetsRepository } from '@/repositories/prisma-pets-repository'

interface RegisterPetUseCaseRequest {
  name: string
  age: number
  breed: string
  city: string
}

export async function registerPetUseCase({
  name,
  age,
  breed,
  city,
}: RegisterPetUseCaseRequest) {
  const petsRepository = new PrismaPetsRepository()

  await petsRepository.create({
    name,
    age,
    breed,
    city,
  })
}

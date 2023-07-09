import { prisma } from '@/lib/prisma'

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
  await prisma.pet.create({
    data: {
      name,
      age,
      breed,
      city,
    },
  })
}

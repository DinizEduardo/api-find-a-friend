import { prisma } from '@/lib/prisma'

import { Prisma } from '@prisma/client'

export class PrismaPetsRepository {
  async create(data: Prisma.PetCreateInput) {
    const user = await prisma.pet.create({
      data,
    })

    return user
  }
}

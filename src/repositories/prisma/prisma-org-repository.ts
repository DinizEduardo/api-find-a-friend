import { prisma } from '@/lib/prisma'

import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../org-repository'

export class PrismaOrgRepository implements OrgsRepository {
  async create(data: Prisma.ORGCreateInput) {
    const org = await prisma.oRG.create({
      data,
    })

    return org
  }

  async findByWhatsApp(whatsapp: string) {
    const org = await prisma.oRG.findUnique({
      where: {
        whatsapp,
      },
    })

    return org
  }
}

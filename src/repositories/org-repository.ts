import { ORG, Prisma } from '@prisma/client'

export interface OrgsRepository {
  create(data: Prisma.ORGCreateInput): Promise<ORG>
  findByWhatsApp(whatsapp: string): Promise<ORG | null>
}

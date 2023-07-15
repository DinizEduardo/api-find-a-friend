import { ORG, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { OrgsRepository } from '../org-repository'

export class InMemoryOrgRepository implements OrgsRepository {
  public items: ORG[] = []

  async create(data: Prisma.ORGCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      address: data.address,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
    }

    this.items.push(org)

    return org
  }

  async findByWhatsApp(whatsapp: string) {
    const org = this.items.find((item) => item.whatsapp === whatsapp)

    if (!org) {
      return null
    }

    return org
  }
}

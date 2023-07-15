import { OrgsRepository } from '@/repositories/org-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'

interface RegisterOrgUseCaseRequest {
  name: string
  address: string
  whatsapp: string
  password: string
}

export class RegisterOrgUseCase {
  constructor(private repository: OrgsRepository) {}

  async execute({
    name,
    address,
    whatsapp,
    password,
  }: RegisterOrgUseCaseRequest) {
    const orgWithSameEmail = await this.repository.findByWhatsApp(whatsapp)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.repository.create({
      name,
      address,
      whatsapp,
      password_hash,
    })

    return { org }
  }
}

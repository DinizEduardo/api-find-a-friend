import { OrgsRepository } from '@/repositories/org-repository'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface AuthenticateOrgUseCaseRequest {
  whatsapp: string
  password: string
}

export class AuthenticateOrgUseCase {
  constructor(private repository: OrgsRepository) {}

  async execute({ whatsapp, password }: AuthenticateOrgUseCaseRequest) {
    const org = await this.repository.findByWhatsApp(whatsapp)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}

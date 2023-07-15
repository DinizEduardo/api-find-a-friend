export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('Whatsapp already exists')
  }
}

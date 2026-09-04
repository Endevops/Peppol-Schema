import type { PeppolContact } from '#/schemas/fields/contact-schema';

export function encodeContact(contact: PeppolContact | undefined) {
  if (!contact) return undefined;

  return { 'cbc:Name': contact.name, 'cbc:Telephone': contact.telephone, 'cbc:ElectronicMail': contact.electronicMail };
}

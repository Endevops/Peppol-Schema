import { Effect, Predicate } from 'effect';

import type { PeppolContact } from '#/schemas/fields/contact-schema';

export const encodeContact = Effect.fn(function* (contact: PeppolContact | undefined) {
  if (Predicate.isNullish(contact)) return undefined;

  return { 'cbc:Name': contact.name, 'cbc:Telephone': contact.telephone, 'cbc:ElectronicMail': contact.electronicMail };
});

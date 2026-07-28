import type { PeppolIdentifier } from '#/schemas/fields/identifier-schema';

export function encodeIdentifier(id?: PeppolIdentifier) {
  if (!id) return undefined;
  if (!id.schemeId) return id.id;
  return { '#text': id.id, '@schemeID': id.schemeId };
}

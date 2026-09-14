import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolContact } from '#/schemas/fields/peppol-contact-schema.ts';
import type { RecursivePartial } from '#/types.ts';

import { getProp } from '#/helpers/get-prop.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

export const decodeContact = Effect.fn(function* (
  node: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolContact> | undefined> {
  const contactNode = yield* getProp(node, ...path);
  if (Predicate.isNullish(contactNode)) return undefined;

  return {
    electronicMail: yield* strOrUnd(contactNode, 'cbc:ElectronicMail'),
    name: yield* strOrUnd(contactNode, 'cbc:Name'),
    telephone: yield* strOrUnd(contactNode, 'cbc:Telephone'),
  };
});

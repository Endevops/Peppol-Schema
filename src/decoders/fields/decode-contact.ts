import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolContact } from '#/schemas/fields/contact-schema';
import type { RecursivePartial } from '#/types';

import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

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

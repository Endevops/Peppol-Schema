import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolIdentifier } from '#/schemas/fields/identifier-schema';

import { decodeIdentifier } from '#/decoders/fields/decode-identifier';

export const decodeElectronicAddress = Effect.fn(function* <const T extends PeppolIdentifier['schemeId'] = string>(
  node: XmlNode | undefined,
  ...path: Array<string>
) {
  const value = yield* decodeIdentifier<T>(node, ...path);
  if (Predicate.isTruthy(value?.schemeId)) {
    // @ts-expect-error I don't want to bother with the typecheck
    value.schemeId = (value.schemeId as string).padStart(4, '0') as T;
  }
  return value;
});

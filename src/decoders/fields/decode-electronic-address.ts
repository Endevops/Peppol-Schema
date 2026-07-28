import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolIdentifier } from '#/schemas/fields/identifier-schema';

import { decodeIdentifier } from '#/decoders/fields/decode-identifier';

export function decodeElectronicAddress<const T extends PeppolIdentifier['schemeId'] = string>(node: XmlNode | undefined, ...path: Array<string>) {
  const value = decodeIdentifier<T>(node, ...path);
  if (value?.schemeId) {
    // @ts-expect-error I don't want to bother with the typecheck
    value.schemeId = (value.schemeId as string).padStart(4, '0') as T;
  }
  return value;
}

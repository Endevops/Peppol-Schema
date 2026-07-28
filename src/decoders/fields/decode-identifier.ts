import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolIdentifier } from '#/schemas/fields/identifier-schema';
import type { RecursivePartial } from '#/types';

import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export interface Identifier<T extends PeppolIdentifier['schemeId'] = string> extends PeppolIdentifier {
  schemeId?: T;
}

export function decodeIdentifier<const T extends PeppolIdentifier['schemeId'] = string>(
  node: XmlNode | undefined,
  ...path: Array<string>
): RecursivePartial<Identifier<T>> | undefined {
  const val = getProp(node, ...path);
  if (!val && val !== 0) return undefined;
  const id = strOrUnd(val);
  if ((typeof val === 'string' || typeof val === 'number') && id) {
    return { id };
  }
  if (!id) return undefined;
  return {
    id,
    // @ts-expect-error I don't want to bother with the typecheck
    schemeId: strOrUnd(val, '@schemeID'),
  };
}

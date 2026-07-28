import type { XmlNode } from '#/helpers/get-prop';
import type { RecursivePartial } from '#/types';

import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodeSimpleIdentifer(doc: XmlNode, ...path: Array<string>): RecursivePartial<{ id: string }> | undefined {
  const node = getProp(doc, ...path);
  if (!node) return undefined;

  return { id: strOrUnd(node, 'cbc:ID') };
}

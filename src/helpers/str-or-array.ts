import type { XmlNode } from '#/helpers/get-prop';

import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export function strOrArray(node: XmlNode): string | Array<string> | undefined;
export function strOrArray(node: XmlNode, ...path: Array<string>): string | Array<string> | undefined;
export function strOrArray(node: XmlNode, ...path: Array<string>): string | Array<string> | undefined {
  const val = getProp(node, ...path);
  if (Array.isArray(val)) {
    return val.map(v => strOrUnd(v)) as Array<string>;
  }

  return strOrUnd(val);
}

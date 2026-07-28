import type { XmlNode } from '#/helpers/get-prop';

import { strOrUnd } from '#/helpers/str-or-und';

export function numOrUnd(node: XmlNode): number | undefined;
export function numOrUnd(node: XmlNode, ...path: Array<string>): number | undefined;
export function numOrUnd(node: XmlNode, ...path: Array<string>): number | undefined {
  const val = strOrUnd(node, ...path);

  return val ? parseFloat(val) : undefined;
}

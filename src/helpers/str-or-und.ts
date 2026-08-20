import type { XmlNode } from '#/helpers/get-prop';

import { getProp } from '#/helpers/get-prop';
import { isDefined } from '#/helpers/is-defined';

export function strOrUnd<const T extends string = string>(node: XmlNode): T | undefined;
export function strOrUnd<const T extends string = string>(node: XmlNode, ...path: Array<string>): T | undefined;
export function strOrUnd<const T extends string = string>(node: XmlNode, ...path: Array<string>): T | undefined {
  const val = getProp(node, ...path);
  if (!isDefined(val)) return undefined;
  if (typeof val !== 'object') return val.toString();
  if (typeof val['#text'] === 'undefined') return undefined;
  return val['#text'].toString();
}

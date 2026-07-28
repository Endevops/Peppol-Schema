import type { XmlNode } from '#/helpers/get-prop';

import { strOrUnd } from '#/helpers/str-or-und';

export function str(node: XmlNode): string;
export function str(node: XmlNode, ...path: Array<string>): string;
export function str(node: XmlNode, ...path: Array<string>): string {
  const val = strOrUnd(node, ...path);
  if (typeof val === 'undefined' || val === null) {
    throw new Error('Invalid node');
  }
  return val;
}

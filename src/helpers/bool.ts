import type { XmlNode } from '#/helpers/get-prop';

import { isDefined } from '#/helpers/is-defined';
import { getProp } from '#/helpers/get-prop';

export function bool<const T extends boolean = boolean>(node: XmlNode, ...path: Array<string>): T {
  const val = getProp(node, ...path);
  if (!isDefined(val)) throw new Error(`Unable to find ${path.join('->')} into ${node}`);
  if (typeof val === 'boolean') return val as T;
  if (typeof val === 'object' && '#text' in val && typeof val['#text'] !== 'undefined') return val['#text'] as T;
  throw new Error(`Unable to find ${path.join('->')} into ${node}`);
}

import type { XmlNode } from '#/helpers/get-prop';

import { getProp } from '#/helpers/get-prop';

export function getArray(node: XmlNode, ...path: Array<string>): Array<XmlNode> {
  if (!node) return [];
  let currentNode = node;
  for (const key of path) {
    if (!currentNode) {
      return [];
    }
    if (Array.isArray(currentNode)) {
      currentNode = currentNode.flatMap(n => getProp(n, key) || []);
    } else {
      currentNode = getProp(currentNode, key);
    }
  }
  if (!currentNode) {
    return [];
  }
  return Array.isArray(currentNode) ? currentNode : [currentNode];
}

import { isDefined } from '#/helpers/is-defined';

// oxlint-disable-next-line typescript/no-explicit-any
export type XmlNode = any;

export function getProp(node: XmlNode, ...path: Array<string>): XmlNode {
  if (!node) {
    return undefined;
  }
  if (!path || path.length === 0) {
    return node;
  }
  let currentNode = node;
  for (const key of path) {
    let newNode = currentNode[key];
    if (isDefined(newNode)) {
      currentNode = newNode;
      continue;
    }
    if (key.includes(':')) {
      const [, localKey] = key.split(':') as [string, string, ...Array<string>];
      currentNode = currentNode[localKey];
      if (!isDefined(currentNode)) {
        return undefined;
      }
    } else {
      return undefined;
    }
  }
  return currentNode;
}

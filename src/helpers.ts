export type XmlNode = any;

function isDefined<const T>(value: T): value is Exclude<T, undefined | null> {
  return typeof value !== 'undefined' && value !== null;
}

/**
 * @description Returns the node at the specified path or `undefined` if the node is `null` or `undefined`.
 *
 * @param node - Xml node.
 * @param path - Path of nodes to get the value from.
 *
 * @returns {@link XmlNode} Or undefined
 */
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
      // NOTE: in case where there isn't any : in the key, we couldn't continue since the value is undefined
      return undefined;
    }
  }
  return currentNode;
}

/**
 * @description Returns the array of nodes or an empty array if the node is null or undefined.
 *
 * @param node - Xml node.
 * @param path - Path of nodes to get the value from.
 */
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

/**
 * @description Returns the boolean value of a node or undefined if the node value is not a valid boolean.
 *
 * @param node Xml node.
 * @param path
 */
export function bool<const T extends boolean = boolean>(node: XmlNode, ...path: Array<string>): T {
  const val = getProp(node, ...path);
  if (!isDefined(val)) throw new Error(`Unable to find ${path.join('->')} into ${node}`);
  if (typeof val === 'boolean') return val as T;
  if (typeof val === 'object' && '#text' in val && typeof val['#text'] !== 'undefined') return val['#text'] as T;
  throw new Error(`Unable to find ${path.join('->')} into ${node}`);
}

/**
 * @description Returns the string value of a node or undefined if the node is null or undefined.
 *
 * @param node Xml node.
 *
 * @returns String or undefined
 */
export function strOrUnd<const T extends string = string>(node: XmlNode): T | undefined;
export function strOrUnd<const T extends string = string>(node: XmlNode, ...path: Array<string>): T | undefined;
export function strOrUnd<const T extends string = string>(node: XmlNode, ...path: Array<string>): T | undefined {
  const val = getProp(node, ...path);
  if (!isDefined(val)) return undefined;
  if (typeof val !== 'object') return val.toString();
  if (typeof val['#text'] === 'undefined') return undefined;
  return val['#text'].toString();
}

/**
 * @description Returns the strign or array of strings value of a node or undefined if the node is null or undefined.
 *
 * @param node Xml node.
 *
 * @returns String or array of strings or undefined
 */
export function strOrArray(node: XmlNode): string | Array<string> | undefined;
export function strOrArray(node: XmlNode, ...path: Array<string>): string | Array<string> | undefined;
export function strOrArray(node: XmlNode, ...path: Array<string>): string | Array<string> | undefined {
  const val = getProp(node, ...path);
  if (Array.isArray(val)) {
    return val.map(v => strOrUnd(v)) as Array<string>;
  }

  return strOrUnd(val);
}

export function str(node: XmlNode): string;
export function str(node: XmlNode, ...path: Array<string>): string;
export function str(node: XmlNode, ...path: Array<string>): string {
  const val = strOrUnd(node, ...path);
  if (typeof val === 'undefined' || val === null) {
    throw new Error('Invalid node');
  }
  return val;
}

/**
 * @description Returns the number value of a node or undefined if the node is null or undefined.
 *
 * @param node Xml node.
 */
export function numOrUnd(node: XmlNode): number | undefined;
export function numOrUnd(node: XmlNode, ...path: Array<string>): number | undefined;
export function numOrUnd(node: XmlNode, ...path: Array<string>): number | undefined {
  const val = strOrUnd(node, ...path);

  return val ? parseFloat(val) : undefined;
}

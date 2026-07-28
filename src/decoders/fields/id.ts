import type { XmlNode } from '#/helpers';
import type { RecursivePartial } from '#/types';

import { getProp, strOrUnd } from '#/helpers';

export function decodeSimpleIdentifer(doc: XmlNode, ...path: Array<string>): RecursivePartial<{ id: string }> | undefined {
  const node = getProp(doc, ...path);
  if (!node) return undefined;

  return { id: strOrUnd(node, 'cbc:ID') };
}

type Exact<TExpected, TActual extends TExpected> = keyof TExpected extends keyof TActual
  ? keyof TActual extends keyof TExpected
    ? TActual
    : never
  : never;

export function encodeSimpleIdentifier<const T extends { id: string } = { id: string }>(identifier: Exact<{ id: string }, T> | undefined) {
  if (!identifier) return undefined;

  return { 'cbc:ID': identifier.id };
}

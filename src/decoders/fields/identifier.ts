import { getProp, strOrUnd } from '#/helpers';
import type { XmlNode } from '#/helpers';
import type { PeppolIdentifier } from '#/schemas/fields/identifier-schema';
import type { RecursivePartial } from '#/types';

interface Identifier<T extends PeppolIdentifier['schemeId'] = string> extends PeppolIdentifier {
  schemeId?: T;
}

export function decodeIdentifier<const T extends PeppolIdentifier['schemeId'] = string>(
  node: XmlNode | undefined,
  ...path: Array<string>
): RecursivePartial<Identifier<T>> | undefined {
  const val = getProp(node, ...path);
  if (!val && val !== 0) return undefined;
  const id = strOrUnd(val);
  if (typeof val === 'string' || typeof val === 'number') {
    return { id };
  }
  if (!id) return undefined;
  return {
    id,
    // @ts-expect-error I don't want to bother with the typecheck
    schemeId: strOrUnd(val, '@schemeID'),
  };
}

export function decodeElectronicAddress<const T extends PeppolIdentifier['schemeId'] = string>(node: XmlNode | undefined, ...path: Array<string>) {
  const value = decodeIdentifier<T>(node, ...path);
  if (value?.schemeId) {
    // @ts-expect-error I don't want to bother with the typecheck
    value.schemeId = (value.schemeId as string).padStart(4, '0') as T;
  }
  return value;
}

export function encodeIdentifier(id?: PeppolIdentifier) {
  if (!id) return undefined;
  if (!id.schemeId) return id.id;
  return { '#text': id.id, '@schemeID': id.schemeId };
}

import type { BaseOutputBuilderFactory } from '@nodable/base-output-builder';

import { NumberValueParser } from '@nodable/base-output-builder';
import { CompactBuilderFactory } from '@nodable/compact-builder';
import { XMLParser } from '@nodable/flexible-xml-parser';

import type { XmlNode } from '#/helpers/get-prop.ts';

export type { XmlNode } from '#/helpers/get-prop.ts';

const numberParser = new NumberValueParser({ eNotation: true, hex: false, leadingZeros: false });

const compactFactory = new CompactBuilderFactory({
  attributes: { valueParsers: ['entity', numberParser, 'boolean'] },
  tags: { valueParsers: ['trim', 'entity', 'boolean', numberParser] },
});

const nodableParser = new XMLParser({
  OutputBuilder: compactFactory as unknown as BaseOutputBuilderFactory,
  attributes: { booleanType: 'allow', prefix: '@' },
  skip: { attributes: false, nsPrefix: true },
});

/**
 * @description Parses an XML string into an {@link XmlNode} tree with the nodable compact builder, coercing values and removing `@xmlns`.
 *
 * @example
 *   ```ts
 *   parseXmlNodable('<root xmlns="urn:x"><a>1</a></root>'); // { root: { a: 1 } }
 *   ```;
 *
 * @param value - The XML document to parse.
 *
 * @returns The parsed {@link XmlNode} tree with `@xmlns` stripped.
 */
export function parseXmlNodable(value: string): XmlNode {
  const parsed = nodableParser.parse(value) as XmlNode;
  stripDefaultXmlns(parsed);
  return parsed;
}

function stripDefaultXmlns(node: unknown): void {
  if (Array.isArray(node)) {
    for (const item of node) stripDefaultXmlns(item);
    return;
  }
  if (typeof node === 'object' && node !== null) {
    const record = node as Record<string, unknown>;
    delete record['@xmlns'];
    for (const key of Object.keys(record)) stripDefaultXmlns(record[key]);
  }
}

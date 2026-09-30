import type { ParseError } from '@endevops/parser';

import { CompactBuilderFactory, makeNumberValueParser } from '@endevops/builder';
import { XMLParser } from '@endevops/parser';
import { Effect } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';

const numberParser = makeNumberValueParser({ eNotation: true, hex: false, leadingZeros: false });

const nodableParser = Effect.gen(function* () {
  const compactFactory = yield* CompactBuilderFactory.make({
    attributes: { valueParsers: ['entity', numberParser, 'boolean'] },
    tags: { valueParsers: ['trim', 'entity', 'boolean', numberParser] },
  });

  return yield* XMLParser.make({
    OutputBuilder: compactFactory,
    attributes: { booleanType: 'allow', prefix: '@' },
    skip: { attributes: false, nsPrefix: true },
  });
}).pipe(Effect.runSync);

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
export const parseXmlNodable = Effect.fn(function* (value: string): Effect.fn.Return<XmlNode, ParseError> {
  const parsed = yield* nodableParser.parse<XmlNode>(value);
  stripDefaultXmlns(parsed);
  return parsed;
});

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

export type { XmlNode };

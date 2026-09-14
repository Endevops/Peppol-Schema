import { Effect } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';

import { decodeLineShared } from '#/decoders/fields/decode-line-shared.ts';
import { decodeNodeList } from '#/decoders/fields/decode-node-list.ts';
import { decodeQuantity } from '#/decoders/fields/decode-quantity.ts';

export const decodeCreditNoteLines = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  return yield* decodeNodeList(
    doc,
    Effect.fn(function* (lineNode: XmlNode) {
      const shared = yield* decodeLineShared(lineNode);
      return { ...shared, creditedQuantity: (yield* decodeQuantity(lineNode, 'cbc:CreditedQuantity'))! };
    }),
    ...path
  ).pipe(Effect.map(items => items ?? []));
});

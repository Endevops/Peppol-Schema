import { Effect } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';

import { decodeLineShared } from '#/decoders/fields/decode-line-shared';
import { decodeNodeList } from '#/decoders/fields/decode-node-list';
import { decodeQuantity } from '#/decoders/fields/decode-quantity';

export const decodeInvoiceLines = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  return yield* decodeNodeList(
    doc,
    Effect.fn(function* (lineNode: XmlNode) {
      const shared = yield* decodeLineShared(lineNode);
      return { ...shared, invoicedQuantity: yield* decodeQuantity(lineNode, 'cbc:InvoicedQuantity') };
    }),
    ...path
  );
});

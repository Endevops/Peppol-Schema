import { Effect } from 'effect';

import type { PeppolNodeError } from '#/helpers/errors';
import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolCreditNoteLine } from '#/schemas/fields/credit-note-line-schema';
import type { RecursivePartial } from '#/types';

import { decodeLineShared } from '#/decoders/fields/decode-line-shared';
import { decodeNodeList } from '#/decoders/fields/decode-node-list';
import { decodeQuantity } from '#/decoders/fields/decode-quantity';

export const decodeCreditNoteLines = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<Array<RecursivePartial<PeppolCreditNoteLine>> | undefined, PeppolNodeError> {
  return yield* decodeNodeList(
    doc,
    Effect.fn(function* (lineNode: XmlNode) {
      const shared = yield* decodeLineShared(lineNode);
      return { ...shared, creditedQuantity: (yield* decodeQuantity(lineNode, 'cbc:CreditedQuantity'))! };
    }),
    ...path
  );
});

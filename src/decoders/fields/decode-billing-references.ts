import { Effect } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolBillingReference } from '#/schemas/fields/billing-references-schema';
import type { RecursivePartial } from '#/types';

import { getArray } from '#/helpers/get-array';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodeBillingReferences = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<Array<RecursivePartial<PeppolBillingReference>> | undefined> {
  const arr = yield* getArray(doc, ...path);
  if (arr.length === 0) return undefined;

  return yield* Effect.forEach(
    arr,
    Effect.fn(function* (billingReference: XmlNode) {
      return {
        invoiceDocumentReference: {
          id: yield* strOrUnd(billingReference, 'cac:InvoiceDocumentReference', 'cbc:ID'),
          issueDate: yield* strOrUnd(billingReference, 'cac:InvoiceDocumentReference', 'cbc:IssueDate'),
        },
      };
    })
  );
});

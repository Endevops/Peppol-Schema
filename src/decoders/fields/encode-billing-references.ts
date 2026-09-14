import { Effect } from 'effect';

import type { PeppolBillingReference } from '#/schemas/fields/peppol-billing-reference-schema';

export const encodeBillingReferences = Effect.fn(function* (billingReferences: ReadonlyArray<PeppolBillingReference> | undefined) {
  return billingReferences?.map(billingReference => ({
    'cac:InvoiceDocumentReference': {
      'cbc:ID': billingReference.invoiceDocumentReference.id,
      'cbc:IssueDate': billingReference.invoiceDocumentReference.issueDate,
    },
  }));
});

import { Effect } from 'effect';

import type { PeppolBillingReference } from '#/schemas/fields/billing-references-schema';

export const encodeBillingReferences = Effect.fn(function* (billingReferences: Array<PeppolBillingReference> | undefined) {
  return billingReferences?.map(billingReference => ({
    'cac:InvoiceDocumentReference': {
      'cbc:ID': billingReference.invoiceDocumentReference.id,
      'cbc:IssueDate': billingReference.invoiceDocumentReference.issueDate,
    },
  }));
});

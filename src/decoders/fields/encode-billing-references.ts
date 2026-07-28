import type { PeppolBillingReference } from '#/schemas/fields/billing-references-schema';

export function encodeBillingReferences(billingReferences: Array<PeppolBillingReference> | undefined) {
  return billingReferences?.map(billingReference => ({
    'cac:InvoiceDocumentReference': {
      'cbc:ID': billingReference.invoiceDocumentReference.id,
      'cbc:IssueDate': billingReference.invoiceDocumentReference.issueDate,
    },
  }));
}

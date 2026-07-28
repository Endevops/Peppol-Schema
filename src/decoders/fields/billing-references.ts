import { getArray, strOrUnd } from '#/helpers';
import type { XmlNode } from '#/helpers';
import type { PeppolBillingReference } from '#/schemas/fields/billing-references-schema';
import type { RecursivePartial } from '#/types';

export function decodeBillingReferences(doc: XmlNode, ...path: Array<string>): Array<RecursivePartial<PeppolBillingReference>> | undefined {
  const arr = getArray(doc, ...path);
  if (!arr.length) {
    return undefined;
  }

  return arr.map(billingReference => ({
    invoiceDocumentReference: {
      id: strOrUnd(billingReference, 'cac:InvoiceDocumentReference', 'cbc:ID'),
      issueDate: strOrUnd(billingReference, 'cac:InvoiceDocumentReference', 'cbc:IssueDate'),
    },
  }));
}

export function encodeBillingReferences(billingReferences: Array<PeppolBillingReference> | undefined) {
  return billingReferences?.map(billingReference => ({
    'cac:InvoiceDocumentReference': {
      'cbc:ID': billingReference.invoiceDocumentReference.id,
      'cbc:IssueDate': billingReference.invoiceDocumentReference.issueDate,
    },
  }));
}

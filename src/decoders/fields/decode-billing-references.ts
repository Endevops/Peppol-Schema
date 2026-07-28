import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolBillingReference } from '#/schemas/fields/billing-references-schema';
import type { RecursivePartial } from '#/types';

import { getArray } from '#/helpers/get-array';
import { strOrUnd } from '#/helpers/str-or-und';

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

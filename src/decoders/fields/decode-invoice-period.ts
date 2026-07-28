import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolInvoicePeriod } from '#/schemas/fields/invoice-period-schema';
import type { RecursivePartial } from '#/types';

import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodeInvoicePeriod(doc: XmlNode): RecursivePartial<PeppolInvoicePeriod> | undefined;
export function decodeInvoicePeriod(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolInvoicePeriod> | undefined;
export function decodeInvoicePeriod(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolInvoicePeriod> | undefined {
  const invoicePeriod = getProp(doc, ...path);
  return invoicePeriod
    ? {
        descriptionCode: strOrUnd(invoicePeriod, 'cbc:DescriptionCode'),
        endDate: strOrUnd(invoicePeriod, 'cbc:EndDate'),
        startDate: strOrUnd(invoicePeriod, 'cbc:StartDate'),
      }
    : undefined;
}

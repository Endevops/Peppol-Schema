import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolInvoiceLinePeriod } from '#/schemas/fields/invoice-line-period-schema';
import type { RecursivePartial } from '#/types';

import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodeInvoiceLinePeriod(doc: XmlNode): RecursivePartial<PeppolInvoiceLinePeriod> | undefined;
export function decodeInvoiceLinePeriod(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolInvoiceLinePeriod> | undefined;
export function decodeInvoiceLinePeriod(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolInvoiceLinePeriod> | undefined {
  const invoicePeriod = getProp(doc, ...path);
  return invoicePeriod ? { endDate: strOrUnd(invoicePeriod, 'cbc:EndDate'), startDate: strOrUnd(invoicePeriod, 'cbc:StartDate') } : undefined;
}

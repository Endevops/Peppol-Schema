import { getProp, strOrUnd } from '#/helpers';
import type { XmlNode } from '#/helpers';
import type { PeppolInvoiceLinePeriod, PeppolInvoicePeriod } from '#/schemas/fields/invoice-period';
import type { RecursivePartial } from '#/types';

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

export function encodeInvoicePeriod(invoicePeriod: PeppolInvoicePeriod | undefined) {
  return invoicePeriod
    ? { 'cbc:StartDate': invoicePeriod.startDate, 'cbc:EndDate': invoicePeriod.endDate, 'cbc:DescriptionCode': invoicePeriod.descriptionCode }
    : undefined;
}

export function decodeInvoiceLinePeriod(doc: XmlNode): RecursivePartial<PeppolInvoiceLinePeriod> | undefined;
export function decodeInvoiceLinePeriod(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolInvoiceLinePeriod> | undefined;
export function decodeInvoiceLinePeriod(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolInvoiceLinePeriod> | undefined {
  const invoicePeriod = getProp(doc, ...path);
  return invoicePeriod ? { endDate: strOrUnd(invoicePeriod, 'cbc:EndDate'), startDate: strOrUnd(invoicePeriod, 'cbc:StartDate') } : undefined;
}

export function encodeInvoiceLinePeriod(invoicePeriod: PeppolInvoiceLinePeriod | undefined) {
  return invoicePeriod ? { 'cbc:StartDate': invoicePeriod.startDate, 'cbc:EndDate': invoicePeriod.endDate } : undefined;
}

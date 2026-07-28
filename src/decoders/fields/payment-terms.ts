import type { XmlNode } from '#/helpers';
import type { PeppolPaymentTerms } from '#/schemas/fields/payment-terms-schema';
import type { RecursivePartial } from '#/types';

import { getProp, strOrUnd } from '#/helpers';

export function decodePaymentTerms(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolPaymentTerms> | undefined {
  const terms = getProp(doc, ...path);
  if (!terms) return undefined;
  const note = getProp(terms, 'cbc:Note');
  return note ? { note: strOrUnd(note) } : undefined;
}

export function encodePaymentTerms(paymentTerms: PeppolPaymentTerms | undefined) {
  if (!paymentTerms) return undefined;

  return { 'cbc:Note': paymentTerms.note };
}

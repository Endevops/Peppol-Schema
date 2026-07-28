import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolPaymentTerms } from '#/schemas/fields/payment-terms-schema';
import type { RecursivePartial } from '#/types';

import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodePaymentTerms(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolPaymentTerms> | undefined {
  const terms = getProp(doc, ...path);
  if (!terms) return undefined;
  const note = getProp(terms, 'cbc:Note');
  return note ? { note: strOrUnd(note) } : undefined;
}

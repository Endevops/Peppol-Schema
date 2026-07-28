import type { XmlNode } from '#/helpers';
import type { PeppolAmount } from '#/schemas/fields/amount-schema';
import type { PeppolCurrencyCode } from '#/schemas/values/currency-codes';
import type { RecursivePartial } from '#/types';

import { getProp } from '#/helpers';

export function decodeAmount(amount: XmlNode | undefined): RecursivePartial<PeppolAmount> | undefined;
export function decodeAmount(amount: XmlNode | undefined, ...path: Array<string>): RecursivePartial<PeppolAmount> | undefined;
export function decodeAmount(amount: XmlNode | undefined, ...path: Array<string>): RecursivePartial<PeppolAmount> | undefined {
  const val = getProp(amount, ...path);
  if (!val && val !== 0) return undefined;
  if (typeof val === 'object') {
    return { currencyId: String(val['@currencyID']) as PeppolCurrencyCode, value: parseFloat(String(val['#text'] ?? val)) };
  }
  return { currencyId: '' as PeppolCurrencyCode, value: parseFloat(String(val)) };
}
export function encodeAmount(amount?: PeppolAmount) {
  if (!amount) return undefined;
  return { '#text': amount.value, '@currencyID': amount.currencyId };
}

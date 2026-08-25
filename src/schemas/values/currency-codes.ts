/**
 * @description Currency codes as defined by ISO 4217.
 *
 * @see https://www.iso.org/iso-4217-currency-codes.html
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/ISO4217/
 */
import type { Brand } from 'effect';

import * as z from 'zod/mini';

import { currencyCodesKeys } from '#/values/currency-code.generated';

export type PeppolCurrencyCode = Brand.Branded<string, 'CurrencyCode'>;

export function currencyCodeSchema(error?: string) {
  return z.string().check(z.refine(val => currencyCodesKeys.includes(val as (typeof currencyCodesKeys)[number]), error));
}

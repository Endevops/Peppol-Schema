import type { PeppolAllowanceCharge } from '#/schemas/fields/allowance-charge-schema';

import { encodeSimpleIdentifier } from '#/decoders/fields/encode-simple-identifier';

export function encodeTaxCategory(taxCategory: PeppolAllowanceCharge['taxCategory']) {
  if (!taxCategory) {
    return undefined;
  }
  return { 'cbc:ID': taxCategory.id, 'cbc:Percent': taxCategory.percent, 'cac:TaxScheme': encodeSimpleIdentifier(taxCategory.taxSchemeId) };
}

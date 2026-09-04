import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolAllowanceCharge } from '#/schemas/fields/allowance-charge-schema';
import type { RecursivePartial } from '#/types';

import { decodeBaseAllowanceCharge } from '#/decoders/fields/decode-base-allowance-charge';
import { decodeTaxCategory } from '#/decoders/fields/decode-tax-category';
import { getArray } from '#/helpers/get-array';

export function decodeAllowanceCharges(
  allowanceCharges: XmlNode,
  ...path: Array<string>
): Array<RecursivePartial<PeppolAllowanceCharge>> | undefined {
  const arr = getArray(allowanceCharges, ...path);
  if (!arr.length) {
    return undefined;
  }

  return arr.map(
    allowanceCharge =>
      ({
        ...decodeBaseAllowanceCharge(allowanceCharge),
        taxCategory: decodeTaxCategory(allowanceCharge, 'cac:TaxCategory'),
      }) as RecursivePartial<PeppolAllowanceCharge>
  );
}

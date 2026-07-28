import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolAllowanceCharge } from '#/schemas/fields/allowance-charge-schema';
import type { RecursivePartial } from '#/types';

import { decodeAmount } from '#/decoders/fields/decode-amount';
import { decodeTaxCategory } from '#/decoders/fields/decode-tax-category';
import { bool } from '#/helpers/bool';
import { getArray } from '#/helpers/get-array';
import { numOrUnd } from '#/helpers/num-or-und';
import { strOrUnd } from '#/helpers/str-or-und';

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
        allowanceChargeReason: strOrUnd(allowanceCharge, 'cbc:AllowanceChargeReason'),
        allowanceChargeReasonCode: strOrUnd(allowanceCharge, 'cbc:AllowanceChargeReasonCode'),
        amount: decodeAmount(allowanceCharge, 'cbc:Amount'),
        baseAmount: decodeAmount(allowanceCharge, 'cbc:BaseAmount'),
        chargeIndicator: bool(allowanceCharge, 'cbc:ChargeIndicator'),
        multiplierFactorNumeric: numOrUnd(allowanceCharge, 'cbc:MultiplierFactorNumeric'),
        taxCategory: decodeTaxCategory(allowanceCharge, 'cac:TaxCategory'),
      }) as RecursivePartial<PeppolAllowanceCharge>
  );
}

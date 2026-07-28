import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolLinePriceAllowanceCharge } from '#/schemas/fields/line-price-allowance-charge-schema';
import type { RecursivePartial } from '#/types';

import { decodeAmount } from '#/decoders/fields/decode-amount';
import { bool } from '#/helpers/bool';
import { getProp } from '#/helpers/get-prop';

export function decodePriceAllowanceCharge(
  allowanceCharges: XmlNode,
  ...path: Array<string>
): RecursivePartial<PeppolLinePriceAllowanceCharge> | undefined {
  const allowanceCharge = getProp(allowanceCharges, ...path);
  if (!allowanceCharge) {
    return undefined;
  }
  return {
    amount: decodeAmount(allowanceCharge, 'cbc:Amount'),
    baseAmount: decodeAmount(allowanceCharge, 'cbc:BaseAmount'),
    chargeIndicator: bool<false>(allowanceCharge, 'cbc:ChargeIndicator'),
  };
}

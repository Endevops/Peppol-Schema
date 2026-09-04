import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolLineAllowanceCharge } from '#/schemas/fields/line-allowance-charge-schema';
import type { RecursivePartial } from '#/types';

import { decodeBaseAllowanceCharge } from '#/decoders/fields/decode-base-allowance-charge';
import { getArray } from '#/helpers/get-array';

export function decodeLineAllowanceCharges(
  allowanceCharges: XmlNode,
  ...path: Array<string>
): Array<RecursivePartial<PeppolLineAllowanceCharge>> | undefined {
  const arr = getArray(allowanceCharges, ...path);
  if (!arr.length) {
    return undefined;
  }
  return arr.map(allowanceCharge => ({ ...decodeBaseAllowanceCharge(allowanceCharge) }) as RecursivePartial<PeppolLineAllowanceCharge>);
}

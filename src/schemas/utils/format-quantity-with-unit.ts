import { quantityToIntlUnitMap } from '#/schemas/utils/quantity-unit-code-to-intl-unit.ts';
import { quantityUnitCodes } from '#/values/quantity-unit-codes.generated';

/**
 * @description Formats a quantity and its unit code for a locale. Uses `Intl.NumberFormat` for mapped codes, otherwise the code list name.
 *
 * @example
 *   ```ts
 *   formatQuantityWithUnit(5, 'KGM', 'en-US', 'long'); // '5 kilograms'
 *   formatQuantityWithUnit(10, 'EA'); // '10 each'
 *   ```;
 *
 * @param value - The numeric quantity to format.
 * @param code - The UN/ECE Rec 20 unit code to render, for example `KGM` or `MTR`.
 * @param locale - BCP 47 locale tag passed to `Intl.NumberFormat`. Defaults to `'en-US'`.
 * @param unitDisplay - `Intl` unit display style: `'short'`, `'narrow'`, or `'long'`. Defaults to `'short'`.
 *
 * @returns The formatted quantity and unit, for example `'5 kilograms'`. Falls back to `<number> <name>` when the code has no `Intl` unit or `Intl`
 *   rejects the unit.
 *
 * @see {@link quantityUnitCodeToIntlUnit}
 */
export function formatQuantityWithUnit(
  value: number,
  code: string,
  locale: string = 'en-US',
  unitDisplay: 'short' | 'narrow' | 'long' = 'short'
): string {
  const intlUnit = quantityToIntlUnitMap[code as keyof typeof quantityToIntlUnitMap];

  if (intlUnit) {
    try {
      return new Intl.NumberFormat(locale, { style: 'unit', unit: intlUnit, unitDisplay }).format(value);
    } catch {}
  }

  const formattedNumber = new Intl.NumberFormat(locale).format(value);
  const unitName = (quantityUnitCodes as Record<string, string>)[code];
  return `${formattedNumber} ${unitName}`;
}

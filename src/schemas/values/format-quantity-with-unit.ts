import { quantityToIntlUnitMap } from '#/schemas/values/quantity-unit-code-to-intl-unit';
import { quantityUnitCodes } from '#/values/quantity-unit-codes.generated';

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

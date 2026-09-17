import type { PeppolQuantityUnitCode } from '#/schemas/values/quantity-unit-codes-schema.ts';

/**
 * @description String union of `Intl.NumberFormat` unit identifiers for base units such as length, area, volume, mass, and temperature.
 */
export type BaseIntlUnit =
  | 'acre'
  | 'bit'
  | 'byte'
  | 'celsius'
  | 'centimeter'
  | 'degree'
  | 'fahrenheit'
  | 'fluid-ounce'
  | 'foot'
  | 'gallon'
  | 'gigabit'
  | 'gigabyte'
  | 'gram'
  | 'hectare'
  | 'inch'
  | 'kilobit'
  | 'kilobyte'
  | 'kilogram'
  | 'kilometer'
  | 'liter'
  | 'megabit'
  | 'megabyte'
  | 'meter'
  | 'mile'
  | 'mile-scandinavian'
  | 'milliliter'
  | 'millimeter'
  | 'ounce'
  | 'percent'
  | 'petabyte'
  | 'pound'
  | 'stone'
  | 'terabit'
  | 'terabyte'
  | 'yard';
/**
 * @description String union of `Intl.NumberFormat` unit identifiers for time units, used on their own and as the denominator of a rate.
 */
export type TimeIntlUnit = 'nanosecond' | 'microsecond' | 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';

/**
 * @description Any `Intl.NumberFormat` unit identifier supported by this module: a {@link BaseIntlUnit}, a {@link TimeIntlUnit}, or a rate such as
 * `'kilometer-per-hour'`.
 */
export type IntlUnit = BaseIntlUnit | TimeIntlUnit | `${BaseIntlUnit}-per-${TimeIntlUnit}`;

/**
 * @description Maps UN/ECE Rec 20 quantity unit codes to `Intl.NumberFormat` unit identifiers. Unmapped codes are omitted.
 *
 * @example
 *   ```ts
 *   quantityToIntlUnitMap.KGM; // 'kilogram'
 *   quantityToIntlUnitMap.KMH; // 'kilometer-per-hour'
 *   ```;
 */
export const quantityToIntlUnitMap = {
  CMT: 'centimeter',
  MTR: 'meter',
  MMT: 'millimeter',
  KMT: 'kilometer',
  INH: 'inch',
  FOT: 'foot',
  YRD: 'yard',
  SMI: 'mile',
  F49: 'mile-scandinavian',
  ACR: 'acre',
  H18: 'hectare',
  LTR: 'liter',
  MLT: 'milliliter',
  GLI: 'gallon',
  GLL: 'gallon',
  OZA: 'fluid-ounce',
  GRM: 'gram',
  KGM: 'kilogram',
  LBR: 'pound',
  ONZ: 'ounce',
  STI: 'stone',
  STN: 'stone',
  SEC: 'second',
  MIN: 'minute',
  HUR: 'hour',
  DAY: 'day',
  WEE: 'week',
  MON: 'month',
  ANN: 'year',
  B98: 'microsecond',
  C26: 'millisecond',
  C47: 'nanosecond',
  CEL: 'celsius',
  FAH: 'fahrenheit',
  A99: 'bit',
  AD: 'byte',
  '2P': 'kilobyte',
  '4L': 'megabyte',
  E34: 'gigabyte',
  E35: 'terabyte',
  E36: 'petabyte',
  B68: 'gigabit',
  B80: 'gigabit',
  C21: 'kilobit',
  B10: 'bit',
  DD: 'degree',
  P1: 'percent',
  KMH: 'kilometer-per-hour',
  MTS: 'meter-per-second',
  HM: 'mile-per-hour',
  KNT: 'kilometer-per-hour',
  '2X': 'meter-per-minute',
  '40': 'milliliter-per-second',
  '41': 'milliliter-per-minute',
  '4G': 'milliliter',
  '4H': 'micrometer' as IntlUnit,
  A44: 'liter',
  A45: 'meter',
  A11: 'meter',
  A12: 'kilometer',
  B57: 'kilometer',
  '4U': 'pound-per-hour',
  '4M': 'gram-per-hour' as IntlUnit,
} satisfies Partial<Record<string, IntlUnit>>;

/**
 * @description Looks up the `Intl.NumberFormat` unit identifier for a UN/ECE Rec 20 quantity unit code.
 *
 * @example
 *   ```ts
 *   quantityUnitCodeToIntlUnit('KGM'); // 'kilogram'
 *   quantityUnitCodeToIntlUnit('EA'); // undefined
 *   ```;
 *
 * @param code - A quantity unit code, typed as {@link PeppolQuantityUnitCode} but accepting any string.
 *
 * @returns The matching {@link IntlUnit}, or `undefined` when the code has no `Intl` unit mapping.
 *
 * @see {@link quantityToIntlUnitMap}
 */
export function quantityUnitCodeToIntlUnit(code: PeppolQuantityUnitCode | (string & {})): IntlUnit | undefined {
  return (quantityToIntlUnitMap as Record<string, IntlUnit>)[code];
}

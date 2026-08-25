import type { PeppolQuantityUnitCode } from '#/schemas/values/quantity-unit-codes-schema';

type BaseIntlUnit =
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
type TimeIntlUnit = 'nanosecond' | 'microsecond' | 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';

export type IntlUnit = BaseIntlUnit | TimeIntlUnit | `${BaseIntlUnit}-per-${TimeIntlUnit}`;

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

export function quantityUnitCodeToIntlUnit(code: PeppolQuantityUnitCode | (string & {})): IntlUnit | undefined {
  return (quantityToIntlUnitMap as Record<string, IntlUnit>)[code];
}

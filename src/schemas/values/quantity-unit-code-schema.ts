import * as z from 'zod/mini';
import { quantityUnitCodes, type quantityUnitCodesKey, quantityUnitCodesKeys } from '#/values/quantity-unit-codes.generated';

export type QuantityUnitCode = quantityUnitCodesKey;
export type PeppolQuantityUnitCodes = quantityUnitCodesKey;

/**
 * @validations
 */
export function quantityUnitCodesSchema(error?: string) {
  return z.string(error).check(z.refine(val => quantityUnitCodesKeys.includes(val)));
}

/**
 * @description Valid Intl.NumberFormat unit identifiers as per ECMA-402 specification.
 *
 * @see https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers
 */
export type IntlUnit =
  | 'acre'
  | 'bit'
  | 'byte'
  | 'celsius'
  | 'centimeter'
  | 'day'
  | 'degree'
  | 'fahrenheit'
  | 'fluid-ounce'
  | 'foot'
  | 'gallon'
  | 'gigabit'
  | 'gigabyte'
  | 'gram'
  | 'hectare'
  | 'hour'
  | 'inch'
  | 'kilobit'
  | 'kilobyte'
  | 'kilogram'
  | 'kilometer'
  | 'liter'
  | 'megabit'
  | 'megabyte'
  | 'meter'
  | 'microsecond'
  | 'mile'
  | 'mile-scandinavian'
  | 'milliliter'
  | 'millimeter'
  | 'millisecond'
  | 'minute'
  | 'month'
  | 'nanosecond'
  | 'ounce'
  | 'percent'
  | 'petabyte'
  | 'pound'
  | 'second'
  | 'stone'
  | 'terabit'
  | 'terabyte'
  | 'week'
  | 'yard'
  | 'year'
  // Compound units (X-per-Y)
  | `${string}-per-${string}`;

/**
 * @description Mapping from UN/ECE Rec 20 quantity unit codes to Intl.NumberFormat unit identifiers. Only mappable units are included; units without a direct Intl
 * equivalent return undefined.
 */
const quantityToIntlUnitMap = {
  // Length units
  CMT: 'centimeter',
  MTR: 'meter',
  MMT: 'millimeter',
  KMT: 'kilometer',
  INH: 'inch',
  FOT: 'foot',
  YRD: 'yard',
  SMI: 'mile',
  F49: 'mile-scandinavian',

  // Area units
  ACR: 'acre',
  H18: 'hectare', // square hectometre (synonym: hectare)

  // Volume units
  LTR: 'liter',
  MLT: 'milliliter',
  GLI: 'gallon', // UK gallon
  GLL: 'gallon', // US gallon
  OZA: 'fluid-ounce',

  // Mass/Weight units
  GRM: 'gram',
  KGM: 'kilogram',
  LBR: 'pound',
  ONZ: 'ounce',
  STI: 'stone', // stone UK
  STN: 'stone', // short ton, close enough mapping

  // Time units
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

  // Temperature units
  CEL: 'celsius',
  FAH: 'fahrenheit',

  // Digital storage units
  A99: 'bit',
  AD: 'byte',
  '2P': 'kilobyte',
  '4L': 'megabyte',
  E34: 'gigabyte',
  E35: 'terabyte',
  E36: 'petabyte',
  B68: 'gigabit',
  B80: 'gigabit', // gigabit per second - mapped to gigabit for base
  C21: 'kilobit', // kibibit - close mapping
  B10: 'bit', // bit per second - mapped to bit for base

  // Angle units
  DD: 'degree',

  // Percentage/ratio
  P1: 'percent',

  // Speed (compound units)
  KMH: 'kilometer-per-hour',
  MTS: 'meter-per-second',
  HM: 'mile-per-hour',
  KNT: 'kilometer-per-hour', // knot, approximate mapping

  // Consumption/efficiency (compound units)
  '2X': 'meter-per-minute',

  // Volume per time (compound units)
  '40': 'milliliter-per-second',
  '41': 'milliliter-per-minute',

  // Additional common mappings
  '4G': 'milliliter', // microlitre -> milliliter approximation
  '4H': 'micrometer' as IntlUnit, // Note: micrometer not in standard list
  A44: 'liter', // decalitre -> liter
  A45: 'meter', // decametre -> meter
  A11: 'meter', // angstrom -> no direct mapping, use meter
  A12: 'kilometer', // astronomical unit -> no direct mapping
  B57: 'kilometer', // light year -> no direct mapping

  // Mass flow (compound units)
  '4U': 'pound-per-hour',
  '4M': 'gram-per-hour' as IntlUnit,
} satisfies Partial<Record<QuantityUnitCode, IntlUnit>>;

/**
 * @description Maps a UN/ECE Rec 20 quantity unit code to a valid Intl.NumberFormat unit identifier.
 *
 * @example
 *   ```typescript
 *   const unit = quantityUnitCodeToIntlUnit('KGM');
 *   // Returns: 'kilogram'
 *
 *   const formatted = new Intl.NumberFormat('en-US', { style: 'unit', unit: unit, unitDisplay: 'long' }).format(5);
 *   // Returns: '5 kilograms'
 *   ```;
 *
 * @param code - The quantity unit code from quantityUnitCodes.
 *
 * @returns The corresponding Intl.NumberFormat unit, or undefined if no mapping exists
 */
export function quantityUnitCodeToIntlUnit(code: QuantityUnitCode | (string & {})): IntlUnit | undefined {
  return quantityToIntlUnitMap[code as keyof typeof quantityToIntlUnitMap];
}

/**
 * @description Formats a numeric value with its unit using Intl.NumberFormat. Falls back to displaying the raw unit name if no Intl mapping exists.
 *
 * @example
 *   ```typescript
 *   formatQuantityWithUnit(5, 'KGM', 'en-US', 'long');
 *   // Returns: '5 kilograms'
 *
 *   formatQuantityWithUnit(100, 'KMH', 'de-DE', 'short');
 *   // Returns: '100 km/h'
 *   ```;
 *
 * @param value - The numeric value to format.
 * @param code - The quantity unit code.
 * @param locale - The locale for formatting (default: 'en-US')
 * @param unitDisplay - How to display the unit: 'short', 'narrow', or 'long' (default: 'short')
 *
 * @returns The formatted string
 */
export function formatQuantityWithUnit(
  value: number,
  code: QuantityUnitCode,
  locale: string = 'en-US',
  unitDisplay: 'short' | 'narrow' | 'long' = 'short'
): string {
  const intlUnit = quantityToIntlUnitMap[code as keyof typeof quantityToIntlUnitMap];

  if (intlUnit) {
    try {
      return new Intl.NumberFormat(locale, { style: 'unit', unit: intlUnit, unitDisplay }).format(value);
    } catch {
      // Fall back if the unit is not supported (e.g., compound units)
    }
  }

  // Fallback: format number and append the unit name
  const formattedNumber = new Intl.NumberFormat(locale).format(value);
  const unitName = quantityUnitCodes[code];
  return `${formattedNumber} ${unitName}`;
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('quantity-unit-code', () => {
    it.each(quantityUnitCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
      expect(quantityUnitCodesSchema().parse(value)).toEqual(expected);
    });

    describe('quantityUnitCodeToIntlUnit', () => {
      describe('length units', () => {
        it('should map CMT to centimeter', () => {
          expect(quantityUnitCodeToIntlUnit('CMT')).toBe('centimeter');
        });

        it('should map MTR to meter', () => {
          expect(quantityUnitCodeToIntlUnit('MTR')).toBe('meter');
        });

        it('should map MMT to millimeter', () => {
          expect(quantityUnitCodeToIntlUnit('MMT')).toBe('millimeter');
        });

        it('should map KMT to kilometer', () => {
          expect(quantityUnitCodeToIntlUnit('KMT')).toBe('kilometer');
        });

        it('should map INH to inch', () => {
          expect(quantityUnitCodeToIntlUnit('INH')).toBe('inch');
        });

        it('should map FOT to foot', () => {
          expect(quantityUnitCodeToIntlUnit('FOT')).toBe('foot');
        });

        it('should map YRD to yard', () => {
          expect(quantityUnitCodeToIntlUnit('YRD')).toBe('yard');
        });

        it('should map SMI to mile', () => {
          expect(quantityUnitCodeToIntlUnit('SMI')).toBe('mile');
        });

        it('should map F49 to mile-scandinavian', () => {
          expect(quantityUnitCodeToIntlUnit('F49')).toBe('mile-scandinavian');
        });
      });

      describe('area units', () => {
        it('should map ACR to acre', () => {
          expect(quantityUnitCodeToIntlUnit('ACR')).toBe('acre');
        });

        it('should map H18 (square hectometre) to hectare', () => {
          expect(quantityUnitCodeToIntlUnit('H18')).toBe('hectare');
        });
      });

      describe('volume units', () => {
        it('should map LTR to liter', () => {
          expect(quantityUnitCodeToIntlUnit('LTR')).toBe('liter');
        });

        it('should map MLT to milliliter', () => {
          expect(quantityUnitCodeToIntlUnit('MLT')).toBe('milliliter');
        });

        it('should map GLI (UK gallon) to gallon', () => {
          expect(quantityUnitCodeToIntlUnit('GLI')).toBe('gallon');
        });

        it('should map GLL (US gallon) to gallon', () => {
          expect(quantityUnitCodeToIntlUnit('GLL')).toBe('gallon');
        });

        it('should map OZA to fluid-ounce', () => {
          expect(quantityUnitCodeToIntlUnit('OZA')).toBe('fluid-ounce');
        });
      });

      describe('mass/weight units', () => {
        it('should map GRM to gram', () => {
          expect(quantityUnitCodeToIntlUnit('GRM')).toBe('gram');
        });

        it('should map KGM to kilogram', () => {
          expect(quantityUnitCodeToIntlUnit('KGM')).toBe('kilogram');
        });

        it('should map LBR to pound', () => {
          expect(quantityUnitCodeToIntlUnit('LBR')).toBe('pound');
        });

        it('should map ONZ to ounce', () => {
          expect(quantityUnitCodeToIntlUnit('ONZ')).toBe('ounce');
        });

        it('should map STI (stone UK) to stone', () => {
          expect(quantityUnitCodeToIntlUnit('STI')).toBe('stone');
        });
      });

      describe('time units', () => {
        it('should map SEC to second', () => {
          expect(quantityUnitCodeToIntlUnit('SEC')).toBe('second');
        });

        it('should map MIN to minute', () => {
          expect(quantityUnitCodeToIntlUnit('MIN')).toBe('minute');
        });

        it('should map HUR to hour', () => {
          expect(quantityUnitCodeToIntlUnit('HUR')).toBe('hour');
        });

        it('should map DAY to day', () => {
          expect(quantityUnitCodeToIntlUnit('DAY')).toBe('day');
        });

        it('should map WEE to week', () => {
          expect(quantityUnitCodeToIntlUnit('WEE')).toBe('week');
        });

        it('should map MON to month', () => {
          expect(quantityUnitCodeToIntlUnit('MON')).toBe('month');
        });

        it('should map ANN to year', () => {
          expect(quantityUnitCodeToIntlUnit('ANN')).toBe('year');
        });

        it('should map B98 to microsecond', () => {
          expect(quantityUnitCodeToIntlUnit('B98')).toBe('microsecond');
        });

        it('should map C26 to millisecond', () => {
          expect(quantityUnitCodeToIntlUnit('C26')).toBe('millisecond');
        });

        it('should map C47 to nanosecond', () => {
          expect(quantityUnitCodeToIntlUnit('C47')).toBe('nanosecond');
        });
      });

      describe('temperature units', () => {
        it('should map CEL to celsius', () => {
          expect(quantityUnitCodeToIntlUnit('CEL')).toBe('celsius');
        });

        it('should map FAH to fahrenheit', () => {
          expect(quantityUnitCodeToIntlUnit('FAH')).toBe('fahrenheit');
        });
      });

      describe('digital storage units', () => {
        it('should map A99 to bit', () => {
          expect(quantityUnitCodeToIntlUnit('A99')).toBe('bit');
        });

        it('should map AD to byte', () => {
          expect(quantityUnitCodeToIntlUnit('AD')).toBe('byte');
        });

        it('should map 2P to kilobyte', () => {
          expect(quantityUnitCodeToIntlUnit('2P')).toBe('kilobyte');
        });

        it('should map 4L to megabyte', () => {
          expect(quantityUnitCodeToIntlUnit('4L')).toBe('megabyte');
        });

        it('should map E34 to gigabyte', () => {
          expect(quantityUnitCodeToIntlUnit('E34')).toBe('gigabyte');
        });

        it('should map E35 to terabyte', () => {
          expect(quantityUnitCodeToIntlUnit('E35')).toBe('terabyte');
        });

        it('should map E36 to petabyte', () => {
          expect(quantityUnitCodeToIntlUnit('E36')).toBe('petabyte');
        });

        it('should map B68 to gigabit', () => {
          expect(quantityUnitCodeToIntlUnit('B68')).toBe('gigabit');
        });
      });

      describe('angle and percentage units', () => {
        it('should map DD to degree', () => {
          expect(quantityUnitCodeToIntlUnit('DD')).toBe('degree');
        });

        it('should map P1 to percent', () => {
          expect(quantityUnitCodeToIntlUnit('P1')).toBe('percent');
        });
      });

      describe('compound speed units', () => {
        it('should map KMH to kilometer-per-hour', () => {
          expect(quantityUnitCodeToIntlUnit('KMH')).toBe('kilometer-per-hour');
        });

        it('should map MTS to meter-per-second', () => {
          expect(quantityUnitCodeToIntlUnit('MTS')).toBe('meter-per-second');
        });

        it('should map HM to mile-per-hour', () => {
          expect(quantityUnitCodeToIntlUnit('HM')).toBe('mile-per-hour');
        });
      });

      describe('unmapped units', () => {
        it('should return undefined for unmapped unit codes', () => {
          // EA is "each" - no Intl equivalent
          expect(quantityUnitCodeToIntlUnit('EA')).toBeUndefined();
        });

        it('should return undefined for piece unit', () => {
          // PCE is "piece"
          expect(quantityUnitCodeToIntlUnit('PCE' as any)).toBeUndefined();
        });
      });
    });

    describe('formatQuantityWithUnit', () => {
      describe('with mapped units', () => {
        it('should format kilogram values correctly', () => {
          const result = formatQuantityWithUnit(5, 'KGM', 'en-US', 'long');
          expect(result).toBe('5 kilograms');
        });

        it('should format singular kilogram value correctly', () => {
          const result = formatQuantityWithUnit(1, 'KGM', 'en-US', 'long');
          expect(result).toBe('1 kilogram');
        });

        it('should format meter values with short display', () => {
          const result = formatQuantityWithUnit(100, 'MTR', 'en-US', 'short');
          expect(result).toBe('100 m');
        });

        it('should format liter values', () => {
          const result = formatQuantityWithUnit(2.5, 'LTR', 'en-US', 'long');
          expect(result).toBe('2.5 liters');
        });

        it('should format temperature values', () => {
          const result = formatQuantityWithUnit(25, 'CEL', 'en-US', 'short');
          expect(result).toBe('25°C');
        });

        it('should format time values', () => {
          const result = formatQuantityWithUnit(30, 'MIN', 'en-US', 'long');
          expect(result).toBe('30 minutes');
        });

        it('should format percentage values', () => {
          const result = formatQuantityWithUnit(75, 'P1', 'en-US', 'short');
          expect(result).toBe('75%');
        });

        it('should format digital storage values', () => {
          const result = formatQuantityWithUnit(500, 'E34', 'en-US', 'short');
          expect(result).toBe('500 GB');
        });
      });

      describe('with different locales', () => {
        it('should format using German locale', () => {
          const result = formatQuantityWithUnit(1000, 'MTR', 'de-DE', 'short');
          // German uses period as thousands separator
          expect(result).toMatch(/1[.\s]?000\s?m/);
        });

        it('should format using French locale', () => {
          const result = formatQuantityWithUnit(5, 'KGM', 'fr-FR', 'long');
          expect(result).toMatch(/5\s?kilogrammes?/);
        });
      });

      describe('with unmapped units (fallback)', () => {
        it('should fallback to unit name for unmapped codes', () => {
          const result = formatQuantityWithUnit(10, 'EA', 'en-US');
          expect(result).toBe('10 each');
        });

        it('should fallback to unit name for piece', () => {
          const result = formatQuantityWithUnit(5, 'PCE' as any, 'en-US');
          // PCE fallback uses the raw unit description from quantity.ts
          expect(result).toMatch(/^5\s/);
        });
      });

      describe('with default parameters', () => {
        it('should use en-US and short display by default', () => {
          const result = formatQuantityWithUnit(10, 'KGM');
          expect(result).toBe('10 kg');
        });
      });

      describe('edge cases', () => {
        it('should handle zero values', () => {
          const result = formatQuantityWithUnit(0, 'KGM', 'en-US', 'long');
          expect(result).toBe('0 kilograms');
        });

        it('should handle negative values', () => {
          const result = formatQuantityWithUnit(-5, 'CEL', 'en-US', 'short');
          expect(result).toBe('-5°C');
        });

        it('should handle decimal values', () => {
          const result = formatQuantityWithUnit(3.14159, 'MTR', 'en-US', 'short');
          // Intl.NumberFormat may round decimals by default
          expect(result).toMatch(/^3\.14\d*\s?m$/);
        });

        it('should handle large values', () => {
          const result = formatQuantityWithUnit(1000000, 'KGM', 'en-US', 'short');
          expect(result).toBe('1,000,000 kg');
        });
      });
    });

    describe('type safety', () => {
      it('should accept valid QuantityUnitCode types', () => {
        // This test mainly verifies TypeScript compilation
        const code: QuantityUnitCode = 'KGM';
        const unit = quantityUnitCodeToIntlUnit(code);
        expect(unit).toBe('kilogram');
      });

      it('should return IntlUnit type for valid mappings', () => {
        const unit: IntlUnit | undefined = quantityUnitCodeToIntlUnit('MTR');
        expect(unit).toBe('meter');
      });
    });
  });
}

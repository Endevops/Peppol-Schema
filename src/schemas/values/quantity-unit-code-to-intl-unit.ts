import type { QuantityUnitCode } from '#/schemas/values/quantity-unit-codes-schema';

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
  | `${string}-per-${string}`;

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
} satisfies Partial<Record<QuantityUnitCode, IntlUnit>>;

export function quantityUnitCodeToIntlUnit(code: QuantityUnitCode | (string & {})): IntlUnit | undefined {
  return quantityToIntlUnitMap[code as keyof typeof quantityToIntlUnitMap];
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
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
        expect(quantityUnitCodeToIntlUnit('EA')).toBeUndefined();
      });

      it('should return undefined for piece unit', () => {
        expect(quantityUnitCodeToIntlUnit('PCE' as any)).toBeUndefined();
      });
    });

    describe('type safety', () => {
      it('should accept valid QuantityUnitCode types', () => {
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

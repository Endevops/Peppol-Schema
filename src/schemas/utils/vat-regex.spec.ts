import { afterEach, describe, expect, it, vi } from 'vitest';

import { vatRegexSchema } from './vat-regex';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('vatRegexSchema', () => {
  it.each([
    ['BE0208158634', 'Belgium'],
    ['ATU12345678', 'Austria'],
    ['BG123456789', 'Bulgaria'],
    ['CY12345678L', 'Cyprus'],
    ['CZ12345678', 'Czechia'],
    ['DE123456789', 'Germany'],
    ['DK12345678', 'Denmark'],
    ['EE123456789', 'Estonia'],
    ['EL123456789', 'Greece (EL)'],
    ['GR123456789', 'Greece (GR)'],
    ['ESA1234567B', 'Spain'],
    ['FI12345678', 'Finland'],
    ['FRAB123456789', 'France'],
    ['GB123456789', 'United Kingdom (9 digits)'],
    ['GB123456789123', 'United Kingdom (12 digits)'],
    ['GBGD123', 'United Kingdom (two letters)'],
    ['HU12345678', 'Hungary'],
    ['IE8S12345L', 'Ireland'],
    ['IT12345678901', 'Italy'],
    ['LT123456789', 'Lithuania (9 digits)'],
    ['LT123456789012', 'Lithuania (12 digits)'],
    ['LU12345678', 'Luxembourg'],
    ['LV12345678901', 'Latvia'],
    ['MT12345678', 'Malta'],
    ['NL123456789B01', 'Netherlands'],
    ['PL1234567890', 'Poland'],
    ['PT123456789', 'Portugal'],
    ['RO12', 'Romania (2 digits)'],
    ['RO1234567890', 'Romania (10 digits)'],
    ['SE123456789012', 'Sweden'],
    ['SI12345678', 'Slovenia'],
    ['SK1234567890', 'Slovakia'],
  ])('should accept %s (%s) as a VAT number', (value, _label) => {
    expect(() => vatRegexSchema.parse(value)).not.toThrow();
  });

  it.each([
    ['BE0208158641', 'Belgium - invalid mod97 check digit'],
    ['BE2208158634', 'Belgium - invalid country digit'],
    ['BE020815863', 'Belgium - too short'],
    ['ATU1234567', 'Austria - too short'],
    ['BG12345678', 'Bulgaria - too short'],
    ['CY12345678X', 'Cyprus - wrong final letter'],
    ['CZ1234567', 'Czechia - too short'],
    ['DE12345678', 'Germany - too short'],
    ['DK123456789', 'Denmark - too long'],
    ['EE12345678', 'Estonia - too short'],
    ['EL12345678', 'Greece - too short'],
    ['GR12345678', 'Greece - too short'],
    ['ES1234567', 'Spain - too short'],
    ['FI123456789', 'Finland - too long'],
    ['FRAB12345678', 'France - too short'],
    ['GB1234567', 'United Kingdom - too short'],
    ['HU123456789', 'Hungary - too long'],
    ['IE8S1234L', 'Ireland - too short'],
    ['IT1234567890', 'Italy - too short'],
    ['LT12345678', 'Lithuania - too short'],
    ['LU123456789', 'Luxembourg - too long'],
    ['LV1234567890', 'Latvia - too short'],
    ['MT123456789', 'Malta - too long'],
    ['NL12345678B01', 'Netherlands - too short'],
    ['PL123456789', 'Poland - too short'],
    ['PT12345678', 'Portugal - too short'],
    ['RO1', 'Romania - too short'],
    ['SE12345678901', 'Sweden - too short'],
    ['SI123456789', 'Slovenia - too long'],
    ['SK123456789', 'Slovakia - too short'],
    ['XX123456789', 'unknown prefix'],
    ['', 'empty string'],
  ])('should reject %s (%s)', (value, _label) => {
    expect(() => vatRegexSchema.parse(value)).toThrow();
  });

  it('rejects non-string inputs', () => {
    expect(() => vatRegexSchema.parse(123)).toThrow();
  });

  describe('Belgian mod97 superRefine', () => {
    it('accepts a Belgian VAT number passing the mod97 check', () => {
      expect(() => vatRegexSchema.parse('BE0208158634')).not.toThrow();
    });

    it('adds an issue when the mod97 check fails', () => {
      expect(() => vatRegexSchema.parse('BE0208158641')).toThrow();
    });
  });
});

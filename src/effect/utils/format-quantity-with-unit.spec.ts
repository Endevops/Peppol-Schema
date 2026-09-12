import { describe, expect, it } from 'vitest';

import type { PeppolQuantityUnitCode } from '#/effect/values/quantity-unit-codes-schema';

import { formatQuantityWithUnit } from './format-quantity-with-unit';

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
      const result = formatQuantityWithUnit(5, 'PCE' as PeppolQuantityUnitCode, 'en-US');
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
      expect(result).toMatch(/^3\.14\d*\s?m$/);
    });

    it('should handle large values', () => {
      const result = formatQuantityWithUnit(1000000, 'KGM', 'en-US', 'short');
      expect(result).toBe('1,000,000 kg');
    });
  });
});

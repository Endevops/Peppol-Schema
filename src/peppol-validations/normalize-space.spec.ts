import { describe, expect, it } from 'vitest';
import { normalizeSpace } from './normalize-space';

describe('normalizeSpace', () => {
  describe('valid inputs', () => {
    it.each([
      ['hello world', 'hello world', 'simple string'],
      ['  hello   world  ', 'hello world', 'string with extra spaces'],
      ['hello\tworld', 'hello world', 'string with tab'],
      ['hello\nworld', 'hello world', 'string with newline'],
      ['  hello\t\n  world  ', 'hello world', 'string with mixed whitespace'],
    ])('should normalize "%s" to "%s" (%s)', (input, expected) => {
      expect(normalizeSpace(input)).toEqual(expected);
    });
  });

  describe('non-string inputs', () => {
    it.each([
      [null, '', 'null input'],
      [undefined, '', 'undefined input'],
      [123, '123', 'numeric input'],
      [true, 'true', 'boolean input'],
    ])('should handle %s and return "%s" (%s)', (input, expected, description) => {
      // @ts-expect-error
      expect(normalizeSpace(input)).toEqual(expected);
    });
  });
});

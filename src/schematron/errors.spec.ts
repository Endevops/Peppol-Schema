/**
 * @description Unit tests for the schematron error schemas.
 */
import { Effect, Schema } from 'effect';
import { describe, expect, it } from 'vitest';

import type { SchematronFieldIssue } from '#/schematron/types.ts';

import { SchematronFieldIssueSchema, SchematronRuleError, SchematronValidationError } from '#/schematron/errors.ts';

describe('SchematronFieldIssueSchema', () => {
  it('decodes scalar expected and actual values', () => {
    expect(Effect.runSync(Schema.decodeEffect(SchematronFieldIssueSchema)({ path: 'a.b', expected: 1, actual: 2 }))).toEqual({
      path: 'a.b',
      expected: 1,
      actual: 2,
    });
  });

  it('decodes null expected and actual values', () => {
    expect(Effect.runSync(Schema.decodeEffect(SchematronFieldIssueSchema)({ path: 'a', expected: null, actual: null }))).toEqual({
      path: 'a',
      expected: null,
      actual: null,
    });
  });
});

describe('SchematronRuleError', () => {
  it('defaults fields to an empty array when constructed without them', () => {
    const fields: ReadonlyArray<SchematronFieldIssue> = new SchematronRuleError({ id: 'x', level: 'fatal', message: 'm' }).fields;
    expect(fields).toEqual([]);
  });

  it('decodes a rule error carrying fields', () => {
    const error = Effect.runSync(
      Schema.decodeEffect(SchematronRuleError)({
        _tag: 'SchematronRuleError',
        fields: [{ path: 'a', expected: 1, actual: 2 }],
        id: 'PEPPOL-EN16931-R001',
        level: 'fatal',
        message: 'boom',
      })
    );
    expect(error.fields).toEqual([{ path: 'a', expected: 1, actual: 2 }]);
  });

  it('defaults fields to an empty array when the key is omitted during decoding', () => {
    const error = Effect.runSync(
      Schema.decodeEffect(SchematronRuleError)({ _tag: 'SchematronRuleError', id: 'PEPPOL-EN16931-R001', level: 'warning', message: 'boom' })
    );
    expect(error.fields).toEqual([]);
  });

  it('encodes fields', () => {
    const encoded = Effect.runSync(
      Schema.encodeEffect(SchematronRuleError)(
        new SchematronRuleError({ id: 'PEPPOL-EN16931-R001', level: 'fatal', message: 'boom', fields: [{ path: 'a', expected: 1, actual: 2 }] })
      )
    );
    expect(encoded).toEqual({
      _tag: 'SchematronRuleError',
      fields: [{ path: 'a', expected: 1, actual: 2 }],
      id: 'PEPPOL-EN16931-R001',
      level: 'fatal',
      message: 'boom',
    });
  });
});

describe('SchematronValidationError', () => {
  it('wraps rule errors with their fields', () => {
    const errors = [
      new SchematronRuleError({ id: 'PEPPOL-EN16931-R001', level: 'fatal', message: 'boom', fields: [{ path: 'a', expected: null, actual: null }] }),
    ];
    const validationError = new SchematronValidationError({ errors });
    expect(validationError.errors[0]?.fields).toEqual([{ path: 'a', expected: null, actual: null }]);
  });
});

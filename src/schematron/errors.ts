import { Effect, Schema } from 'effect';

const scalarValueSchema = Schema.Union([Schema.Finite, Schema.String, Schema.Boolean]);

/**
 * @description The Effect schema for a single {@link SchematronFieldIssue}, describing one field compared by a schematron rule.
 *
 * @example
 *   ```ts
 *   Schema.decodeUnknownSync(SchematronFieldIssueSchema)({ path: 'taxTotals[0].taxAmount.value', expected: 100, actual: 90 });
 *   ```;
 *
 * @see {@link SchematronFieldIssue}
 */
export const SchematronFieldIssueSchema = Schema.Struct({
  path: Schema.String,
  expected: Schema.NullOr(scalarValueSchema),
  actual: Schema.NullOr(scalarValueSchema),
});

/**
 * @description Failure of a single schematron rule against a document.
 *
 * @example
 *   ```ts
 *   new SchematronRuleError({
 *     id: 'PEPPOL-EN16931-R001',
 *     level: 'fatal',
 *     message: 'The document must carry a number.',
 *     fields: [{ path: 'invoiceNumber', expected: null, actual: null }],
 *   });
 *   ```;
 *
 * @see {@link SchematronValidationError}
 */
export class SchematronRuleError extends Schema.TaggedError<SchematronRuleError>()('SchematronRuleError', {
  id: Schema.String,
  level: Schema.Literals(['fatal', 'warning']),
  message: Schema.String,
  fields: Schema.Array(SchematronFieldIssueSchema).pipe(
    Schema.withConstructorDefault(Effect.sync(() => [])),
    Schema.withDecodingDefaultKey(Effect.sync(() => []))
  ),
}) {}

/**
 * @description Failure of a schematron validation run, wrapping every rule that failed.
 *
 * @example
 *   ```ts
 *   new SchematronValidationError({ errors: [ruleError] });
 *   ```;
 *
 * @see {@link SchematronRuleError}
 */
export class SchematronValidationError extends Schema.TaggedError<SchematronValidationError>()('SchematronValidationError', {
  errors: Schema.Array(SchematronRuleError),
}) {}

import { Schema } from 'effect';

/**
 * @description Failure of a single schematron rule against a document.
 */
export class SchematronRuleError extends Schema.TaggedError<SchematronRuleError>()('SchematronRuleError', {
  id: Schema.String,
  level: Schema.Literals(['fatal', 'warning']),
  message: Schema.String,
}) {}

/**
 * @description Failure of a schematron validation run, wrapping every rule that failed.
 */
export class SchematronValidationError extends Schema.TaggedError<SchematronValidationError>()('SchematronValidationError', {
  errors: Schema.Array(SchematronRuleError),
}) {}

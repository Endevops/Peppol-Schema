import { Schema } from 'effect';

/**
 * @description XSD `time` lexical value (`HH:MM:SS` with optional fractional seconds and timezone). Effect port of `xsdTime` (`z.string().check(z.regex(...))`):
 * keeps the value as a plain string and only validates the shape.
 */
export const xsdTime = Schema.String.check(
  Schema.isPattern(
    /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,9})?(?:Z|-0[1-9]|-1\d|-2[0-3]|-00:?(?:0[1-9]|[1-5]\d)|\+[01]\d|\+2[0-3])?(?:|:?[0-5]\d)$/
  )
).annotate({ message: 'Invalid ISO time' });

export type XsdTime = typeof xsdTime.Type;

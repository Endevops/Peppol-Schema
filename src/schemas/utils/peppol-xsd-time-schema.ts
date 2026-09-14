import { Clock, DateTime, Effect, Schema, SchemaGetter, SchemaIssue } from 'effect';

/**
 * @description XSD `time` lexical value (`HH:MM:SS` with optional fractional seconds and timezone). Effect port of `xsdTime` (`z.string().check(z.regex(...))`):
 * keeps the value as a plain string and only validates the shape.
 */
export const peppolXsdTimeSchema = Schema.String.check(
  Schema.isPattern(
    /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,9})?(?:Z|-0[1-9]|-1\d|-2[0-3]|-00:?(?:0[1-9]|[1-5]\d)|\+[01]\d|\+2[0-3])?(?:|:?[0-5]\d)$/
  )
)
  .pipe(
    Schema.decodeTo(Schema.DateTimeUtc, {
      decode: SchemaGetter.transformEffect((input, options) =>
        Clock.currentTimeMillis.pipe(
          Effect.map(millis => DateTime.make(millis)),
          Effect.flatMap(option => Effect.fromOption(option)),
          Effect.map(date =>
            DateTime.withDate(date, date => {
              date.setUTCHours(0, 0, 0, 0);
              return DateTime.make(date.getTime());
            })
          ),
          Effect.flatMap(option => Effect.fromOption(option)),
          Effect.mapError(() => new SchemaIssue.InvalidValue({ message: 'Invalid date input' }, input, options))
        )
      ),
      encode: SchemaGetter.transform(self => DateTime.toDate(self).toISOString().slice(10)),
    })
  )
  .annotate({ message: 'Invalid ISO time' });

export type XsdTime = typeof peppolXsdTimeSchema.Type;

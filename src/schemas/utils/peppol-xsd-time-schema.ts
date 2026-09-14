import { Clock, Option, DateTime, Effect, Predicate, Schema, SchemaGetter, SchemaIssue, SchemaParser } from 'effect';

import { formatXsdTime } from '#/schemas/utils/format-xsd-time.ts';
import { opaque } from '#/schemas/utils/opaque.ts';

const timeRegex =
  /^(?<hours>[01]\d|2[0-3]):(?<minutes>[0-5]\d):(?<seconds>[0-5]\d)(?<nanoseconds>\.\d{1,9})?(?<tz>(?:Z|-0[1-9]|-1\d|-2[0-3]|-00:?(?:0[1-9]|[1-5]\d)|\+[01]\d|\+2[0-3])?(?:|:?[0-5]\d))$/;
const timeZoneRegex = /^(?:(?<utc>Z)|[-+](?<hours>0[1-9]|1\d|2[0-3]|00):?(?<minutes>[0-5]\d))$/;
const numberFromString = SchemaParser.decodeSync(
  Schema.UndefinedOr(Schema.String.pipe(Schema.withDecodingDefault(Effect.succeed('0')))).pipe(
    Schema.decodeTo(Schema.Number, { encode: SchemaGetter.String(), decode: SchemaGetter.Number() }),
    Schema.catchDecoding(() => Effect.succeedSome(0))
  )
);

/**
 * @description Parse a timezone offset from a string. The string must be in the format `(+|-)HH:MM` where `HH` and `MM` are two digits.
 *
 * @param tz - The timzeone offset string.
 *
 * @returns
 *
 * @internal
 */
export const parseZoneOffsetFromString = (tz: `+${number}:${number}` | `-${number}:${number}` | (string & {})) => {
  const tzRegexResult = timeZoneRegex.exec(tz);
  if (Predicate.isNullish(tzRegexResult)) {
    return undefined;
  }
  const [_tzParsed, _isUtc, tzHours, tzMinutes] = tzRegexResult;
  const offset = DateTime.zoneMakeOffset((numberFromString(tzHours) * 60 + numberFromString(tzMinutes)) * 60 * 1000);
  return offset;
};

/**
 * @description XSD `time` lexical value (`HH:MM:SS` with optional fractional seconds and timezone). Effect port of `xsdTime` (`z.string().check(z.regex(...))`):
 * keeps the value as a plain string and only validates the shape.
 */
export class PeppolXsdTime extends opaque<PeppolXsdTime>()(
  Schema.String.check(
    Schema.isPattern(
      /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,9})?(?:Z|-0[1-9]|-1\d|-2[0-3]|-00:?(?:0[1-9]|[1-5]\d)|\+[01]\d|\+2[0-3])?(?:|:?[0-5]\d)$/
    ).annotate({ message: 'Invalid ISO time' })
  )
    .pipe(
      Schema.decodeTo(Schema.DateTimeUtc, {
        decode: SchemaGetter.transformEffect((input, options) =>
          Clock.currentTimeMillis.pipe(
            Effect.map(millis => DateTime.make(millis)),
            Effect.flatMap(option => Effect.fromOption(option)),
            Effect.map(date =>
              DateTime.withDate(date, date => {
                const regexResult = timeRegex.exec(input);
                if (Predicate.isNullish(regexResult)) return Option.none();
                const [_time, hours, minutes, seconds, nanoseconds, tz] = regexResult;

                date.setUTCHours(numberFromString(hours), numberFromString(minutes), numberFromString(seconds), numberFromString(nanoseconds));
                if (Predicate.isUndefined(tz) || tz === 'Z') {
                  return DateTime.make(date.getTime());
                }
                const offset = parseZoneOffsetFromString(tz);
                if (Predicate.isNullish(offset)) {
                  return DateTime.make(date.getTime());
                }

                return DateTime.makeZoned(date.getTime(), { adjustForTimeZone: false, timeZone: offset }).pipe(
                  Option.map(date => DateTime.toUtc(date))
                );
              })
            ),
            Effect.flatMap(option => Effect.fromOption(option)),
            Effect.catchTag('NoSuchElementError', () => Effect.fail(new SchemaIssue.InvalidValue({ message: 'Invalid date input' }, input, options)))
          )
        ),
        encode: SchemaGetter.transform(self => formatXsdTime(self)),
      })
    )
    .annotate({ message: 'Invalid ISO time' })
) {}

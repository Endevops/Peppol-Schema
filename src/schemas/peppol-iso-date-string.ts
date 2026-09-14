import { DateTime, Schema, SchemaGetter } from 'effect';

import { opaque } from '#/schemas/utils/opaque';

/**
 * @description ISO 8601 calendar date string (`YYYY-MM-DD`). Effect port of `dateOnly` (`z.iso.date()`): keeps the value as a plain string and only validates the
 * shape — no `Date` conversion.
 *
 * @format date
 *
 * @see PEPPOL-EN16931-F001: A date MUST be formatted YYYY-MM-DD.
 */
export class PeppolIsoDateString extends opaque<PeppolIsoDateString>()(
  Schema.String.check(Schema.isPattern(/^\d{4}-\d{2}-\d{2}Z?$/)).pipe(
    Schema.decodeTo(Schema.DateTimeUtc, {
      decode: SchemaGetter.dateTimeUtcFromInput().map(DateTime.removeTime),
      encode: SchemaGetter.transform(DateTime.formatIsoDate),
    })
  )
) {}

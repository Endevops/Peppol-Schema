import { Schema } from 'effect';

import { isValidMod97_0208 } from '#/peppol-validations/is-valid-mod97-0208';

/**
 * @description Belgian VAT number (`BE` + 10 digits with mod 97-0208 check digits). Effect port of the `BE` member of `vatRegexSchema`: prefix, exact length,
 * pattern, and mod 97 check-digit validation share the original `'Invalid belgian vat number'` message.
 */
const belgianVat = Schema.String.check(
  Schema.isStartsWith('BE'),
  Schema.isLengthBetween(12, 12),
  Schema.isPattern(/^BE[01]\d{9}$/),
  Schema.makeFilter((value: string) => isValidMod97_0208(value.substring(2)).success)
).annotate({ message: 'Invalid belgian vat number' });

/**
 * @description EU VAT identification number (one member per member-state prefix/pattern). Effect port of `vatRegexSchema` (`z.union([...])` of
 * `z.string().check(...)` members): each member keeps its original prefix + pattern checks as `Schema.String.check` filters.
 */
export const vatRegexSchema = Schema.Union([
  belgianVat,
  Schema.String.check(Schema.isStartsWith('AT'), Schema.isPattern(/^ATU\d{8}$/)),
  Schema.String.check(Schema.isStartsWith('BG'), Schema.isPattern(/^BG\d{9,10}$/)),
  Schema.String.check(Schema.isStartsWith('CY'), Schema.isPattern(/^CY\d{8}L$/)),
  Schema.String.check(Schema.isStartsWith('CZ'), Schema.isPattern(/^CZ\d{8,10}$/)),
  Schema.String.check(Schema.isStartsWith('DE'), Schema.isPattern(/^DE\d{9}$/)),
  Schema.String.check(Schema.isStartsWith('DK'), Schema.isPattern(/^DK\d{8}$/)),
  Schema.String.check(Schema.isStartsWith('EE'), Schema.isPattern(/^EE\d{9}$/)),
  Schema.String.check(Schema.isStartsWith('EL'), Schema.isPattern(/^EL\d{9}$/)),
  Schema.String.check(Schema.isStartsWith('GR'), Schema.isPattern(/^GR\d{9}$/)),
  Schema.String.check(Schema.isStartsWith('ES'), Schema.isPattern(/^ES[0-9A-Z]\d{7}[0-9A-Z]$/)),
  Schema.String.check(Schema.isStartsWith('FI'), Schema.isPattern(/^FI\d{8}$/)),
  Schema.String.check(Schema.isStartsWith('FR'), Schema.isPattern(/^FR[0-9A-Z]{2}\d{9}$/)),
  Schema.String.check(Schema.isStartsWith('GB'), Schema.isPattern(/^GB(\d{9}(\d{3})?|[A-Z]{2}\d{3})$/)),
  Schema.String.check(Schema.isStartsWith('HU'), Schema.isPattern(/^HU\d{8}$/)),
  Schema.String.check(Schema.isStartsWith('IE'), Schema.isPattern(/^IE\dS\d{5}L$/)),
  Schema.String.check(Schema.isStartsWith('IT'), Schema.isPattern(/^IT\d{11}$/)),
  Schema.String.check(Schema.isStartsWith('LT'), Schema.isPattern(/^LT(\d{9}|\d{12})$/)),
  Schema.String.check(Schema.isStartsWith('LU'), Schema.isPattern(/^LU\d{8}$/)),
  Schema.String.check(Schema.isStartsWith('LV'), Schema.isPattern(/^LV\d{11}$/)),
  Schema.String.check(Schema.isStartsWith('MT'), Schema.isPattern(/^MT\d{8}$/)),
  Schema.String.check(Schema.isStartsWith('NL'), Schema.isPattern(/^NL\d{9}B\d{2}$/)),
  Schema.String.check(Schema.isStartsWith('PL'), Schema.isPattern(/^PL\d{10}$/)),
  Schema.String.check(Schema.isStartsWith('PT'), Schema.isPattern(/^PT\d{9}$/)),
  Schema.String.check(Schema.isStartsWith('RO'), Schema.isPattern(/^RO\d{2,10}$/)),
  Schema.String.check(Schema.isStartsWith('SE'), Schema.isPattern(/^SE\d{12}$/)),
  Schema.String.check(Schema.isStartsWith('SI'), Schema.isPattern(/^SI\d{8}$/)),
  Schema.String.check(Schema.isStartsWith('SK'), Schema.isPattern(/^SK\d{10}$/)),
]);

export type VatRegex = typeof vatRegexSchema.Type;

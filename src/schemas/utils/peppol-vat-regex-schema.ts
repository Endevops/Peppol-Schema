import { Schema } from 'effect';

import { isValidMod97_0208 } from '#/peppol-validations/is-valid-mod97-0208.ts';

/**
 * @description Belgian VAT number (`BE` + 10 digits with mod 97-0208 check digits). Effect port of the `BE` member of `vatRegexSchema`: prefix, exact length,
 * pattern, and mod 97 check-digit validation share the original `'Invalid belgian vat number'` message.
 */
const belgianVat = Schema.String.check(
  Schema.isStartingWith('BE'),
  Schema.isBetweenLength(12, 12),
  Schema.isPattern(/^BE[01]\d{9}$/),
  Schema.makeFilter((value: string) => isValidMod97_0208(value.substring(2)).success)
).annotate({ message: 'Invalid belgian vat number' });

/**
 * @description EU VAT identification number (one member per member-state prefix/pattern). Effect port of `vatRegexSchema` (`z.union([...])` of
 * `z.string().check(...)` members): each member keeps its original prefix + pattern checks as `Schema.String.check` filters.
 *
 * @example
 *   ```ts
 *   const value = 'DE123456789';
 *   ```;
 */
export const PeppolVatRegex = Schema.Union([
  belgianVat,
  Schema.String.check(Schema.isStartingWith('AT'), Schema.isPattern(/^ATU\d{8}$/)),
  Schema.String.check(Schema.isStartingWith('BG'), Schema.isPattern(/^BG\d{9,10}$/)),
  Schema.String.check(Schema.isStartingWith('CY'), Schema.isPattern(/^CY\d{8}L$/)),
  Schema.String.check(Schema.isStartingWith('CZ'), Schema.isPattern(/^CZ\d{8,10}$/)),
  Schema.String.check(Schema.isStartingWith('DE'), Schema.isPattern(/^DE\d{9}$/)),
  Schema.String.check(Schema.isStartingWith('DK'), Schema.isPattern(/^DK\d{8}$/)),
  Schema.String.check(Schema.isStartingWith('EE'), Schema.isPattern(/^EE\d{9}$/)),
  Schema.String.check(Schema.isStartingWith('EL'), Schema.isPattern(/^EL\d{9}$/)),
  Schema.String.check(Schema.isStartingWith('GR'), Schema.isPattern(/^GR\d{9}$/)),
  Schema.String.check(Schema.isStartingWith('ES'), Schema.isPattern(/^ES[0-9A-Z]\d{7}[0-9A-Z]$/)),
  Schema.String.check(Schema.isStartingWith('FI'), Schema.isPattern(/^FI\d{8}$/)),
  Schema.String.check(Schema.isStartingWith('FR'), Schema.isPattern(/^FR[0-9A-Z]{2}\d{9}$/)),
  Schema.String.check(Schema.isStartingWith('GB'), Schema.isPattern(/^GB(\d{9}(\d{3})?|[A-Z]{2}\d{3})$/)),
  Schema.String.check(Schema.isStartingWith('HU'), Schema.isPattern(/^HU\d{8}$/)),
  Schema.String.check(Schema.isStartingWith('IE'), Schema.isPattern(/^IE\dS\d{5}L$/)),
  Schema.String.check(Schema.isStartingWith('IT'), Schema.isPattern(/^IT\d{11}$/)),
  Schema.String.check(Schema.isStartingWith('LT'), Schema.isPattern(/^LT(\d{9}|\d{12})$/)),
  Schema.String.check(Schema.isStartingWith('LU'), Schema.isPattern(/^LU\d{8}$/)),
  Schema.String.check(Schema.isStartingWith('LV'), Schema.isPattern(/^LV\d{11}$/)),
  Schema.String.check(Schema.isStartingWith('MT'), Schema.isPattern(/^MT\d{8}$/)),
  Schema.String.check(Schema.isStartingWith('NL'), Schema.isPattern(/^NL\d{9}B\d{2}$/)),
  Schema.String.check(Schema.isStartingWith('PL'), Schema.isPattern(/^PL\d{10}$/)),
  Schema.String.check(Schema.isStartingWith('PT'), Schema.isPattern(/^PT\d{9}$/)),
  Schema.String.check(Schema.isStartingWith('RO'), Schema.isPattern(/^RO\d{2,10}$/)),
  Schema.String.check(Schema.isStartingWith('SE'), Schema.isPattern(/^SE\d{12}$/)),
  Schema.String.check(Schema.isStartingWith('SI'), Schema.isPattern(/^SI\d{8}$/)),
  Schema.String.check(Schema.isStartingWith('SK'), Schema.isPattern(/^SK\d{10}$/)),
]).pipe(Schema.toStandardSchemaV1);

/**
 * @description Decoded form of {@link PeppolVatRegex}.
 */
export type PeppolVatRegex = Schema.Schema.Type<typeof PeppolVatRegex>;

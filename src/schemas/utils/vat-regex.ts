import * as z from 'zod/mini';

import { isValidMod97_0208 } from '#/peppol-validations/is-valid-mod97-0208';

export const vatRegexSchema = z.union([
  z.string().check(
    z.startsWith('BE'),
    z.length(12),
    z.regex(/^BE[01]\d{9}$/, { error: () => 'Invalid belgian vat number' }),
    z.superRefine((value, ctx) => {
      const result = isValidMod97_0208(value.substring(2));
      if (!result.success) {
        const message = 'Invalid belgian vat number';

        if (import.meta.env['DEV'] && !import.meta.env['TEST']) {
          console.log(`Validation ${result.actual} != ${result.expected}`);
          message.concat(`(Validation ${result.actual} != ${result.expected})`);
        }

        ctx.addIssue({ code: 'custom', continue: false, input: value, message });
      }
    })
  ),
  z.string().check(z.startsWith('AT'), z.regex(/^ATU\d{8}$/)),
  z.string().check(z.startsWith('BG'), z.regex(/^BG\d{9,10}$/)),
  z.string().check(z.startsWith('CY'), z.regex(/^CY\d{8}L$/)),
  z.string().check(z.startsWith('CZ'), z.regex(/^CZ\d{8,10}$/)),
  z.string().check(z.startsWith('DE'), z.regex(/^DE\d{9}$/)),
  z.string().check(z.startsWith('DK'), z.regex(/^DK\d{8}$/)),
  z.string().check(z.startsWith('EE'), z.regex(/^EE\d{9}$/)),
  z.string().check(z.startsWith('EL'), z.regex(/^EL\d{9}$/)),
  z.string().check(z.startsWith('GR'), z.regex(/^GR\d{9}$/)),
  z.string().check(z.startsWith('ES'), z.regex(/^ES[0-9A-Z]\d{7}[0-9A-Z]$/)),
  z.string().check(z.startsWith('FI'), z.regex(/^FI\d{8}$/)),
  z.string().check(z.startsWith('FR'), z.regex(/^FR[0-9A-Z]{2}\d{9}$/)),
  z.string().check(z.startsWith('GB'), z.regex(/^GB(\d{9}(\d{3})?|[A-Z]{2}\d{3})$/)),
  z.string().check(z.startsWith('HU'), z.regex(/^HU\d{8}$/)),
  z.string().check(z.startsWith('IE'), z.regex(/^IE\dS\d{5}L$/)),
  z.string().check(z.startsWith('IT'), z.regex(/^IT\d{11}$/)),
  z.string().check(z.startsWith('LT'), z.regex(/^LT(\d{9}|\d{12})$/)),
  z.string().check(z.startsWith('LU'), z.regex(/^LU\d{8}$/)),
  z.string().check(z.startsWith('LV'), z.regex(/^LV\d{11}$/)),
  z.string().check(z.startsWith('MT'), z.regex(/^MT\d{8}$/)),
  z.string().check(z.startsWith('NL'), z.regex(/^NL\d{9}B\d{2}$/)),
  z.string().check(z.startsWith('PL'), z.regex(/^PL\d{10}$/)),
  z.string().check(z.startsWith('PT'), z.regex(/^PT\d{9}$/)),
  z.string().check(z.startsWith('RO'), z.regex(/^RO\d{2,10}$/)),
  z.string().check(z.startsWith('SE'), z.regex(/^SE\d{12}$/)),
  z.string().check(z.startsWith('SI'), z.regex(/^SI\d{8}$/)),
  z.string().check(z.startsWith('SK'), z.regex(/^SK\d{10}$/)),
]);

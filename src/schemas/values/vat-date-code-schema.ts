import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { vatDateCodesKeys } from '#/values/vat-dates.generated';

/**
 * @validations
 * - PEPPOL-EN16931-CL006: Invoice period description code must be according to UNCL 2005 D.16B.
 */
export class PeppolVatDateCode extends opaque<PeppolVatDateCode>()(Schema.Literals(vatDateCodesKeys)) {}

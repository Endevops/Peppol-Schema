import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getProfile, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-P0100',
  level: 'fatal',
  message: 'Invoice type code MUST be set according to the profile.',
} as const satisfies SchematronRule;

const PROFILE_01_INVOICE_TYPE_CODES = new Set([
  '71',
  '80',
  '82',
  '84',
  '102',
  '218',
  '219',
  '326',
  '331',
  '380',
  '382',
  '383',
  '384',
  '386',
  '388',
  '393',
  '395',
  '553',
  '575',
  '623',
  '780',
  '817',
  '870',
  '875',
  '876',
  '877',
]);

function evaluatePeppolEn16931P0100(document: PeppolDocument): boolean {
  const invoiceTypeCode = 'invoiceTypeCode' in document ? document.invoiceTypeCode : undefined;
  if (invoiceTypeCode === undefined) {
    return true;
  }
  const profile = getProfile(document);
  if (profile === 'Unknown' || profile !== '01') {
    return true;
  }
  return PROFILE_01_INVOICE_TYPE_CODES.has(invoiceTypeCode);
}

export const validatePeppolEn16931P0100 = schematronRule(rule, evaluatePeppolEn16931P0100);

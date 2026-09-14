import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getProfile, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-P0101',
  level: 'fatal',
  message: 'Credit note type code MUST be set according to the profile.',
} as const satisfies SchematronRule;

const PROFILE_01_CREDIT_NOTE_TYPE_CODES = new Set(['381', '396', '81', '83', '532']);

function evaluatePeppolEn16931P0101(document: PeppolDocument): boolean {
  const creditNoteTypeCode = 'creditNoteTypeCode' in document ? document.creditNoteTypeCode : undefined;
  if (creditNoteTypeCode === undefined) {
    return true;
  }
  const profile = getProfile(document);
  if (profile === 'Unknown' || profile !== '01') {
    return true;
  }
  return PROFILE_01_CREDIT_NOTE_TYPE_CODES.has(creditNoteTypeCode);
}

export const validatePeppolEn16931P0101 = schematronRule(rule, evaluatePeppolEn16931P0101);

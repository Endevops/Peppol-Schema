import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getProfile, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-P0101',
  level: 'fatal',
  message: 'Credit note type code MUST be set according to the profile.',
} as const satisfies SchematronRule;

const PROFILE_01_CREDIT_NOTE_TYPE_CODES = new Set(['381', '396', '81', '83', '532']);

export function validatePeppolEn16931P0101(document: PeppolDocument): SchematronRuleResult {
  const creditNoteTypeCode = 'creditNoteTypeCode' in document ? document.creditNoteTypeCode : undefined;
  if (creditNoteTypeCode === undefined) {
    return schematronResult(rule, true);
  }
  const profile = getProfile(document);
  if (profile === 'Unknown' || profile !== '01') {
    return schematronResult(rule, true);
  }
  return schematronResult(rule, PROFILE_01_CREDIT_NOTE_TYPE_CODES.has(creditNoteTypeCode));
}

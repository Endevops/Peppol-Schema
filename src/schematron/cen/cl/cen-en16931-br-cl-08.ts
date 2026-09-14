import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { noteSubjectCodeIsUncl4451, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CL-08',
  level: 'fatal',
  message: 'Invoiced note subject code shall be coded using UNCL4451',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCl08(document: PeppolDocument): boolean {
  const passed = noteSubjectCodeIsUncl4451(document);
  return passed;
}

export const validateCenEn16931BrCl08 = schematronRule(rule, evaluateCenEn16931BrCl08);

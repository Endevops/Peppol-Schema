import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { noteSubjectCodeIsUncl4451, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CL-08',
  level: 'fatal',
  message: 'Invoiced note subject code shall be coded using UNCL4451',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCl08(document: PeppolDocument): SchematronRuleResult {
  const passed = noteSubjectCodeIsUncl4451(document);
  return schematronResult(rule, passed);
}

import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getProfile, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R007',
  level: 'fatal',
  message: "Business process MUST be in the format 'urn:fdc:peppol.eu:2017:poacc:billing:NN:1.0' where NN indicates the process number.",
} as const satisfies SchematronRule;

export function validatePeppolEn16931R007(document: PeppolDocument): SchematronRuleResult {
  return schematronResult(rule, getProfile(document) !== 'Unknown');
}

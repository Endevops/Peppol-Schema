import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getProfile, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R007',
  level: 'fatal',
  message: "Business process MUST be in the format 'urn:fdc:peppol.eu:2017:poacc:billing:NN:1.0' where NN indicates the process number.",
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R007(document: PeppolDocument): boolean {
  return getProfile(document) !== 'Unknown';
}

export const validatePeppolEn16931R007 = schematronRule(rule, evaluatePeppolEn16931R007);

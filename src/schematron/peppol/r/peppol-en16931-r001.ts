import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = { id: 'PEPPOL-EN16931-R001', level: 'fatal', message: 'Business process MUST be provided.' } as const satisfies SchematronRule;

function evaluatePeppolEn16931R001(document: PeppolDocument): boolean {
  return typeof document.profileId === 'string' && document.profileId.trim() !== '';
}

export const validatePeppolEn16931R001 = schematronRule(rule, evaluatePeppolEn16931R001);
